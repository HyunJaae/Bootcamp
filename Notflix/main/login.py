import re
from main import * #from main import * : main에 선언된 모든 값을 가져온다 , __init__ file에 선언된 라이브러리를 가져와 사용할 수 있음.
from flask import Flask, Blueprint, flash, render_template, request, url_for, jsonify, redirect, session
from pymongo import MongoClient

app = Flask(__name__)
#객체 = Blueprint("name" , __name__ , url_prefix="") : (이름, 모듈명, URL 프리픽스 값)
#이름은 url_for함수에서 사용되며 , 모듈명은 init.py에서 선언한 모듈을 뜻함 , url_prefix="주소" 주소에는 브라우져에서 선언될 url을 입력한다 
client = MongoClient('mongodb+srv://notflix:1514@cluster0.jtaa3.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.notflix

blueprint = Blueprint("login" , __name__ , url_prefix="/login")

class loginForm:
    def login(self, id, pw):
        pass



@blueprint.route("/") #<- 데코레이터
def login_template():
        return render_template("login.html")

@blueprint.route("/login_done", methods=["get"])
def login_done():
        userName = request.args.get("id")
        pswd = {request.args.get("pw")}
        userList = db.users.find({}, {'_id': 0})
        for i in userList:
                try:
                        if i.get('name') in userName and i.get('password') in pswd:
                                return render_template("main.html")
                        else:
                                flash("비밀번호 또는 아이디가 틀렸습니다.")
                                return render_template("login.html")
                except:
                        return render_template("login.html")
                # if i.get('name') == userName and i.get('password') == pswd:
                #         return render_template("main.html")
                # elif i.get('name') != userName or i.get('password' != pswd):
                #         return render_template("sign_up.html")
                # else:
                #         return render_template("login.html")
        return render_template("login.html")
        # try:
        #         userId = userList[int]['name']
        #         userPw = userList[int]['password']
        #         if userId == userName and userPw == pswd:
        #                 return render_template("main.html")
        #         else:
        #                 flash("비밀번호가 틀렸습니다.")
        #                 return render_template("login.html")
        # except:
        #         flash("아이디 또는 비밀번호가 틀렸습니다.")
        #         return render_template("login.html")
        # users_list = list(db.users.find({},{'_id':False}))
        # return jsonify({'users':users_list})

# 회원가입 창을 통해 등록한 유저 정보를 로그인 입력 시 대조하여 확인 후 메인페이지로 이동시키기
# 대조 시 맞지 않을 경우 아니라고 알림창 띄우기
# 메인페이지 이동 시 로그인 상태 유지
