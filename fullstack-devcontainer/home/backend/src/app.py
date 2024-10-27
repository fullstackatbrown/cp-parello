import os
import secrets
from urllib.parse import urlencode
from dotenv import load_dotenv
from flask import Flask, redirect, url_for, flash, session, \
    current_app, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user,\
    current_user
import requests
from passlib.hash import pbkdf2_sha256
from uuid import uuid4




#--------------------------------Load secret keys-------------------------------
load_dotenv()
flask_key = os.getenv('FLASK_KEY')
google_client_id = os.getenv('GOOGLE_CLIENT_ID')
google_client_secret = os.getenv('GOOGLE_CLIENT_SECRET')
github_client_id = os.getenv('GITHUB_CLIENT_ID')
github_client_secret = os.getenv('GITHUB_CLIENT_SECRET')
#-------------------------------------------------------------------------------


#-----------------------------Site Specific Pages-------------------------------
HOME_PAGE = "http://localhost:5173/"
PERSONAL_PAGE = "http://localhost:5173/personal-page"


#---------------------------Initialize the Flask App----------------------------
app = Flask(__name__)
app.config['SECRET_KEY'] = flask_key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['OAUTH2_PROVIDERS'] = {
    # Google OAuth 2.0
    'google': {
        'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
        'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
        'authorize_url': 'https://accounts.google.com/o/oauth2/auth',
        'token_url': 'https://accounts.google.com/o/oauth2/token',
        'userinfo': {
            'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
            'email': lambda json: json['email'],
        },
        'scopes': ['https://www.googleapis.com/auth/userinfo.email'],
    },

    # GitHub OAuth 2.0
    'github': {
        'client_id': os.environ.get('GITHUB_CLIENT_ID'),
        'client_secret': os.environ.get('GITHUB_CLIENT_SECRET'),
        'authorize_url': 'https://github.com/login/oauth/authorize',
        'token_url': 'https://github.com/login/oauth/access_token',
        'userinfo': {
            'url': 'https://api.github.com/user/emails',
            'email': lambda json: json[0]['email'],
        },
        'scopes': ['user:email'],
    },
}
#-------------------------------------------------------------------------------




#-----------------------------Initialize Database-------------------------------
# 
# This action provides an object relational mapper which allows the storing of
# python user objects in a sqlite database. 
#
db = SQLAlchemy(app)
#-------------------------------------------------------------------------------




#--------------------------Initialize Login Manger------------------------------
#
# This login manager can ensure that a user is logged in when making requests
#
login = LoginManager(app)
#-------------------------------------------------------------------------------




#----------------------------------User Class-----------------------------------
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(128), primary_key=True)
    email = db.Column(db.String(64), nullable=True, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    # Additional fields can be added here!
    # There will likely be a lot more data 
    # associated to a user. Here is where we put it!

    def __init__(self, email, password=None):
        self.id = str(uuid4())
        self.email = email
        if password:
            self.set_password(password)
        else:
            self.set_password(secrets.token_hex(32))

    def set_password(self, password):
        self.password_hash = pbkdf2_sha256.hash(password)

    def check_password(self, password):
        return pbkdf2_sha256.verify(password, self.password_hash)
#-------------------------------------------------------------------------------




#---------------------------------Login Management------------------------------
@login.user_loader
def load_user(id):
    return db.session.get(User, str(id))


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(HOME_PAGE)


@app.route('/authorize/<provider>')
def oauth2_authorize(provider):
    if not current_user.is_anonymous:
        return redirect(PERSONAL_PAGE)

    provider_data = current_app.config['OAUTH2_PROVIDERS'].get(provider)
    if provider_data is None:
        abort(404)

    # Generate a random string for the state parameter
    session['oauth2_state'] = secrets.token_urlsafe(16)

    # Create a query string with all the OAuth2 parameters

    qs = urlencode({
        'client_id': provider_data['client_id'],
        'redirect_uri': url_for('oauth2_callback', provider=provider,_external=True).replace('/callback', '/api/callback'),
        'response_type': 'code',
        'scope': ' '.join(provider_data['scopes']),
        'state': session['oauth2_state'],
    })

    
    # Redirect the user to the OAuth2 provider authorization URL
    return redirect(provider_data['authorize_url'] + '?' + qs)


@app.route('/callback/<provider>')
def oauth2_callback(provider):
    if not current_user.is_anonymous:
        return redirect(PERSONAL_PAGE)

    provider_data = current_app.config['OAUTH2_PROVIDERS'].get(provider)
    if provider_data is None:
        abort(404)

    # If there was an authentication error, flash the error messages and exit
    if 'error' in request.args:
        for k, v in request.args.items():
            if k.startswith('error'):
                flash(f'{k}: {v}')
        return redirect(HOME_PAGE)

    # Make sure that the state parameter matches the one we created in the
    # authorization request
    if request.args['state'] != session.get('oauth2_state'):
        abort(401)

    # Make sure that the authorization code is present
    if 'code' not in request.args:
        abort(401)

    # Exchange the authorization code for an access token
    response = requests.post(provider_data['token_url'], data={
        'client_id': provider_data['client_id'],
        'client_secret': provider_data['client_secret'],
        'code': request.args['code'],
        'grant_type': 'authorization_code',
        'redirect_uri': url_for('oauth2_callback', provider=provider,_external=True).replace('/callback', '/api/callback'), 
    }, headers={'Accept': 'application/json'})
    if response.status_code != 200:
        abort(401)
    oauth2_token = response.json().get('access_token')
    
    if not oauth2_token:
        abort(401)

    # Use the access token to get the user's email address
    response = requests.get(provider_data['userinfo']['url'], headers={
        'Authorization': 'Bearer ' + oauth2_token,
        'Accept': 'application/json',
    })
    if response.status_code != 200:
        abort(401)
    email = provider_data['userinfo']['email'](response.json())

    # Find or create the user in the database
    user = db.session.scalar(db.select(User).where(User.email == email))
    if user is None:
        user = User(email=email, username=email.split('@')[0])
        db.session.add(user)
        db.session.commit()

    # log the user in
    login_user(user)
    return redirect(PERSONAL_PAGE)


@app.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return redirect(PERSONAL_PAGE)

    if not request.is_json:
        return jsonify({"error": "Invalid Request"}), 400

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Password and Email Required"}), 400

    user = db.session.scalar(db.select(User).where(User.email == email))
    
    if user is None:
        # Sign up the user
        user = User(email, password=password)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify({"message": "User signed up"}), 201

    if user.check_password(password):
        # Log in the user
        login_user(user)
        return jsonify({"message": "User logged in"}), 200

    return jsonify({"error": "Login failed. Verify your username and password and try again"}), 401

@app.route('/test-login', methods=['GET'])
def test_login():
    if current_user.is_authenticated:
        return jsonify({"message" : "authenticated"}), 200
    else:
        return jsonify({"message" : "not logged in"}), 200
#-------------------------------------------------------------------------------

    






#-------------------------------App Initialization------------------------------


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run()



#-------------------------------------------------------------------------------

# Initialize grid state
grid_state = [0] * (64 * 256)

@app.route('/api/updateGrid', methods=['POST'])
def update_grid():
    data = request.json
    x = data.get('x')
    y = data.get('y')
    on = data.get('on')
    index = min(y, 63) * 256 + min(255, x)
    if 0 <= index < len(grid_state):
        grid_state[index] = on
        return jsonify({"status": "success"}), 200
    return jsonify({"status": "error", "message": "Invalid index"}), 400

@app.route('/api/clearGrid', methods=['POST'])
def clear_grid():
    global grid_state
    grid_state = [0] * (64 * 256)
    return jsonify({"status": "success"}), 200

@app.route('/api/getGrid', methods=['GET'])
def get_grid():
    return jsonify({"grid": grid_state}), 200

if __name__ == '__main__':
    app.run(debug=True)