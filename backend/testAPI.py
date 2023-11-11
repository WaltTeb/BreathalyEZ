from flask import Flask,jsonify,request
from flask_cors import CORS

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
    app.run()