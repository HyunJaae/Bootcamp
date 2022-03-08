from http import client
from flask import Flask, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient
import hashlib
app = Flask(__name__)

import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.d6z8z.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.gazuaaa



@app.route("/")
def index_template():
    return render_template("index.html")


@app.route("/login/")
def login_template():
    return render_template("login.html")

@app.route("/join")
def join_template():
    return render_template("join.html")


@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    username_receive = request.form['username_give']
    exists = bool(db.users.find_one({"username": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})

@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    name_receive=request.form['name_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    # 패스워드는 받고 해쉬암호화를 해준다.
    doc = {
        "username": username_receive,                               # 아이디
        "password": password_hash,                                  # 비밀번호
        "profile_name": username_receive,                           # 프로필 이름 기본값은 아이디
        "name" : name_receive,                                      # 유저 이름
        "profile_pic": "",                                          # 프로필 사진 파일 이름
        "profile_pic_real": "profile_pics/profile_placeholder.png", # 프로필 사진 기본 이미지
        "profile_info": ""                                          # 프로필 한 마디
    }
    db.users.insert_one(doc)
    return jsonify({'result': 'success'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)