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





@app.route("/main/kospi", methods=['GET'])
def kospi():
    all_kospi = list(db.kospi.find({}, {'_id': False}))
    return jsonify({'kospi': all_kospi})

@app.route("/main/kosdaq", methods=['GET'])
def kosdaq():
    all_kosdaq = list(db.kosdaq.find({}, {'_id': False}))
    return jsonify({"kosdaq": all_kosdaq})


# mypage 보여주기
@app.route("/mypage/", methods=['GET'])
def mypage_template():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_stocks = list(db.my_stock.find({"username": payload["id"]}).sort("stock_cost", -1).limit(30))
        print(user_stocks)
        for user_stock in user_stocks:
            user_stock["_id"] = str(user_stock["_id"])
        return jsonify({"result": "success", "msg": "포스팅을 가져왔습니다.", "user_stock": user_stock})





# mypage 상단 버튼
@app.route('/')
def main_template():
    token_receive = request.cookies.get('mytoken')

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        username = payload["id"]
        status = (username == payload["id"])
        return render_template("main.html",status=status)
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect("/login")

# 나의 정보 보여주기
# @app.route("/mypage_done")
# def my_template():
#     token_receive = request.cookies.get('mytoken', SECRET_KEY, algorithm=['HS256'])
#     try:
#         payload = jwt.decode(token_receive)
#         user_info = db.users.find_one({"username": payload["id"]})
#         return render_template('mypage.html', user_info=user_info["nick"])


#  mypage 상단 좌측 버튼
@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/my_stock', methods=['POST'])
def my_stock():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        stock_name_receive = request.form["stock_name_give"]
        stock_cost_receive = request.form["stock_cost_give"]
        doc = {
            "username": user_info["username"],
            "profile_name": user_info["profile_name"],
            "profile_pic_real": user_info["profile_pic_real"],
            "stock_name": stock_name_receive,
            "stock_cost": stock_cost_receive
        }
        db.my_stock.insert_one(doc)
        return jsonify({"result": "success", 'msg': '포스팅 성공'})

# mypage 상단 우측 버튼


@app.route("/login/")
def login():
    login_cookie = request.cookies.get('mytoken')
    if login_cookie is not None:
        return redirect(url_for("main"))
    else:
        return render_template("login.html")

@app.route("/join")
def join():
    return render_template("join.html")

# mypage
# 나의 주식데이터 가져오기
@app.route("/mypage/get", methods=["GET"])
def mypage_get():
    my_stocks = list(db.users.find({}, {'_id': False}))
    return jsonify({'stocks': my_stocks})
# 나의 주식데이터 삭제
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

    if result is not None:
        payload = {
         'id': username_receive,
         'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    try:
        username_receive = request.form['username_give']
        password_receive = request.form['password_give']
        print(username_receive, password_receive)
        pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
        print(pw_hash)
        result = db.users.find_one({'username': username_receive, 'password': pw_hash})
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
    except:
        print("예외")
        return jsonify({'result': 'fail', 'msg': '그냥 안됩니다.'})
3


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
        "username": username_receive,
        "password": password_hash,
        "profile_name": username_receive,
        "name" : name_receive

    }
    db.users.insert_one(doc)
    return jsonify({'result': 'success'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
