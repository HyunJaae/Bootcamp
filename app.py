from http import client
from flask import Flask, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient
import hashlib
app = Flask(__name__)

import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.d6z8z.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.gazuaaa

### bs4 라이브러리
from bs4 import BeautifulSoup
from datetime import datetime ##현재시각 출력 datetime
import requests  ## url 정보를 받아오기 위한 requests
import time  ## 1분 단위 주가 정보를 위한 시간 측정 time

def get_code(company_code):
    url = "https://m.stock.naver.com/domestic/index/" + company_code
    result = requests.get(url)
    bs_obj = BeautifulSoup(result.content, "html.parser")
    return bs_obj

def get_price(company_code):
    bs_obj = get_code(company_code)
    no_today = bs_obj.find("p", {"class": "no_today"})
    blind = no_today.find("span", {"class": "blind"})
    now_price = blind.text
    return now_price

company_codes = ["KOSDAQ","KOSPI","",""]

while True:
    now = datetime.now()
    print(now)

    for item in company_codes:
        now_price = get_price(itme)
        print(now_price)
    print("--------------------")
    time.sleep(60)



@app.route("/")
def index_template():
    return render_template("index.html")


# mypage 상단 우측 버튼
@app.route('/main')
def main():
    return render_template("main.html")

@app.route("/login")
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