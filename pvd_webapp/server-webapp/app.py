from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

grid = [[False for _ in range(256)] for _ in range(64)]

def set_pixel(x, y, on):
    global grid
    try:
        x, y = int(x), int(y)
        if 0 <= x < 256 and 0 <= y < 64:
            grid[y][x] = on == True or on == 'True'
    except Exception as e:
        print(f"Error setting pixel: {e}")

@app.route('/updateGrid')
def updateGrid():
    global grid
    grid = [[False for _ in range(256)] for _ in range(64)]
    code = request.args.get('code')
    try:
        exec(code)
        return jsonify({"grid": grid})
    except Exception as e:
        print(f"Error executing code: {e}")
        return jsonify({"error": str(e), "grid": grid}), 400

@app.route('/fetchGrid')
def getGrid():
    return jsonify({"grid": grid})

if __name__ == '__main__':
    app.run(debug=True)