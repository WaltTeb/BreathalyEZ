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
        average = "blank"
        try:
            for i in range(100):
                x = ser.readline()
                try:
                    x = x.decode('UTF-8')
                    y = x.split('\r')[0]
                    collectSample.append(float(y))
                except:
                    y = 0.00
            average = sum(collectSample)/len(collectSample)
        except Exception as e:
            average = f'error occured, exception = {e}'

        v = average
        ppm = 150.4351049*pow(v, 5) - 2244.75988*pow(v, 4) + 13308.5139*pow(v, 3) -39136.08594*pow(v, 2) + 57082.6258*v - 32982.05333

        if ppm <= 70:
            bac = 0
        elif ppm >= 500:
            bac = -1
        else:
            bac = ppm / 2600
        
        data = {
            "BAC": bac
        }

    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0')