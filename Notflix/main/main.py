# from main import * : main에 선언된 모든 값을 가져온다 , __init__ file에 선언된 라이브러리를 가져와 사용할 수 있음.
from urllib import response
from urllib.parse import urlparse

import soupsieve
from main import *
from flask import Blueprint
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import certifi

# 객체 = Blueprint("name" , __name__ , url_prefix="") : (이름, 모듈명, URL 프리픽스 값)
# 이름은 url_for함수에서 사용되며 , 모듈명은 init.py에서 선언한 모듈을 뜻함 , url_prefix="주소" 주소에는 브라우져에서 선언될 url을 입력한다
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
# data = requests.get(
#     'https://movie.naver.com/movie/running/current.naver', headers=headers)

url = 'https://movie.naver.com/movie/running/current.naver'
blueprint = Blueprint("main", __name__, url_prefix="/")


@blueprint.route("/")  # <- 데코레이터
def main_template():

    return render_template("main.html")


# @app.route("/showMovies", methods=['GET'])
# def main_movies():
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
#     ul = soup.find('ul', class_="lst_detail_t1")
#     img = ul.select('li> div > a >img')
#     print(len(img))

#     for i in img:
#         print(i.get('src'))

#     return render_template("main.html")
