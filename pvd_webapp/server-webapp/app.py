import requests
import json
import ephem
from flask import Flask, render_template, request
import os
import json

# from ephem import degree

URL = 'https://network.satnogs.org/api/observations/?id=&status=&ground_station=&start=&end=&satellite__norad_cat_id=&transmitter_uuid=ZJxCeQmih9zDfYNVrB4wRN&transmitter_mode=&transmitter_type=&waterfall_status=&vetted_status=&vetted_user=&observer=&start__lt=&observation_id='

#print('%s %s' % (iss.sublong, iss.sublat))
#print(iss.sublat / ephem.degree)
#print(iss.sublong / ephem.degree)

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/telemetry")
def get_telemetry():
    result = requests.get(URL)
    data = result.json()
    line1 = data[0]['tle0']
    line2 = data[0]['tle1']
    line3 = data[0]['tle2']
    time = data[0]["end"]
    # line1 = "ISS (ZARYA)"
    # line2 = "1 25544U 98067A   24273.53740646  .00027676  00000-0  49267-3 0  9992"
    # line3 = "2 25544  51.6372 158.5265 0007071  43.8964 316.2585 15.49895374474737"
    iss = ephem.readtle(line1, line2, line3)
    iss.compute(ephem.now())
    return {
        "latitude": iss.sublat / ephem.degree,
        "longitude": iss.sublong / ephem.degree,
        "end": time
    }

grid = [[False for _ in range(256)] for _ in range(64)]

def set_pixel(x, y, on):
    grid[y][x] = False if on == 'FALSE' else True

@app.route('/updateGrid')
def updateGrid():
    global grid
    grid = [[False for _ in range(256)] for _ in range(64)]
    code = request.args.get('code')
    exec(code)
    return json.dumps({"status": "success"})

@app.route('/fetchGrid')
def getGrid():
    return json.dumps({"grid": grid})

