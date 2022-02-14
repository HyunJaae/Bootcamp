from flask import Flask, render_template, request, jsonify
from flask import Blueprint

app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://notflix:1514@cluster0.jtaa3.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.notflix

blueprint = Blueprint("sign_up" , __name__ , url_prefix="/sign_up")

@blueprint.route("/")
def signup_template():
    return render_template("sign_up.html")

@app.route('/')
def home():
    return render_template('main.html')


@app.route("/users", methods=["POST"])
def users_post():
    name_receive = request.form['name_give']
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']

    users_list = list(db.users.find({}, {'_id': False}))
    count = len(users_list) + 1

    doc = {
        'user_index':count,
        'name': name_receive,
        'email': email_receive,
        'password': password_receive
    }
    db.users.insert_one(doc)

    return jsonify({'msg': '회원가입을 축하합니다'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)