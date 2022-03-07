from http import client
from flask import Flask, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('AWS 주소', 27017, username="", password="")
db = client.userinfo

@app.route("/")
def index_template():
    return render_template("index.html")


@app.route("/login/")
def login_template():
    return render_template("login.html")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)