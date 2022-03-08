from http import client
from flask import Flask, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient

app = Flask(__name__)

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


@app.route("/login/")
def login_template():
    return render_template("login.html")

@app.route("/join")
def join_template():
    return render_template("join.html")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)