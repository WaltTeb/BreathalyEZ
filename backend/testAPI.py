from flask import Flask,jsonify,request
from flask_cors import CORS
import serial

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def hello():
    if(request.method == 'GET'):
        collectSample = []
        ser = serial.Serial('/dev/ttyACM0')
        for i in range(100):
            x = ser.readline()
            collectSample.append(x)
        average = sum(collectSample)/100

        data = {
            "ppm": average
        }

    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0')