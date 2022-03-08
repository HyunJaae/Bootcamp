from http import client
from flask import Flask, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient

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




@app.route("/")
def index_template():
    return render_template("index.html")


@app.route("/login/")
def login_template():
    return render_template("login.html")

@app.route("/join")
def join_template():
    return render_template("join.html")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)