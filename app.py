from http import client
from flask import Flask, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient
import jwt
import datetime
import hashlib
app = Flask(__name__)

SECRET_KEY = 'GAZUAA'

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
    url = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjA3&pkid=194&qvt=0&query=" + company_code
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
        now_price = get_price(item)
        print(now_price)
    print("--------------------")
    time.sleep(60)




@app.route("/")
def index_template():
    return render_template("index.html")

@app.route("/mypage/")
def mypage_template():
    return render_template("mypage.html")


@app.route("/login/")
def login_template():
    return render_template("login.html")

@app.route("/login/done")
def done_template():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
    result = db.user.find_one({'id': id_receive, 'pw': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        # JWT 토큰에는, payload와 시크릿키가 필요합니다.
        # 시크릿키가 있어야 토큰을 디코딩(=풀기) 해서 payload 값을 볼 수 있습니다.
        # 아래에선 id와 exp를 담았습니다. 즉, JWT 토큰을 풀면 유저ID 값을 알 수 있습니다.
        # exp에는 만료시간을 넣어줍니다. 만료시간이 지나면, 시크릿키로 토큰을 풀 때 만료되었다고 에러가 납니다.
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256').decode('utf-8')

        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

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