from http import client
from flask import Flask, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient
from datetime import timedelta, datetime
import jwt

import hashlib

app = Flask(__name__)

SECRET_KEY = 'GAZUAA'

import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.d6z8z.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.gazuaaa


@app.route("/")
def index_template():
    return render_template("index.html")

@app.route("/mypage/")
def mypage_template():
    return render_template("mypage.html")

# mypage 상단 버튼
@app.route('/main')
def main():
    return render_template("main.html")
@app.route("/login/")
def login():
    return render_template("login.html")
@app.route("/join")
def join():
    return render_template("join.html")
# mypage get post
@app.route("/mypage", methods=["GET"])
def mypage_get():
    all_users = list(db.users.find({}, {'_id': False}))
    return jsonify({'users':all_users})

@app.route("/mypage/sell", methods=["POST"])
def stock_sell():
    return jsonify({'msg': '매도 완료!'})



@app.route('/login_Done/', methods=["POST"])
def sign_in():
    # 로그인
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    print(username_receive, password_receive)

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'username': username_receive, 'password': pw_hash})
    print(str(pw_hash))
    if result is not None:
        payload = {
         'id': username_receive,
         'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디 또는 비밀번호가 일치하지 않습니다.'})











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
        "name" : name_receive                                    # 유저 이름
                                                 # 프로필 사진 파일 이름
                                                # 프로필 사진 기본 이미지                                            # 프로필 한 마디
    }
    db.users.insert_one(doc)
    return jsonify({'result': 'success'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)