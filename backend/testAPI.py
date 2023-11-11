import os
from flask import Flask,jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
IP_ADDRESS = os.environ.get("RPI_IP_ADDRESS")

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def hello():
    if(request.method == 'GET'):
        data = {
            'welcome' : 'bingus'
        }
    return jsonify(data)

if __name__ == '__main__':
    app.run(host=f'{IP_ADDRESS}')