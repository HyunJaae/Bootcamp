# from main import * : main에 선언된 모든 값을 가져온다 , __init__ file에 선언된 라이브러리를 가져와 사용할 수 있음.

from urllib import response


from main import *
from flask import Blueprint
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import certifi


client = MongoClient(
    'mongodb+srv://notflix:1514@cluster0.jtaa3.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.notflix


# 객체 = Blueprint("name" , __name__ , url_prefix="") : (이름, 모듈명, URL 프리픽스 값)
# 이름은 url_for함수에서 사용되며 , 모듈명은 init.py에서 선언한 모듈을 뜻함 , url_prefix="주소" 주소에는 브라우져에서 선언될 url을 입력한다
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
# data = requests.get(
#     'https://movie.naver.com/movie/running/current.naver', headers=headers)

url = 'https://movie.naver.com/movie/running/current.naver'
url2 = 'https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=%EC%98%81%ED%99%94+%EC%88%9C%EC%9C%84'
blueprint = Blueprint("main", __name__, url_prefix="/")
response = requests.get(url2)
soup = BeautifulSoup(response.content, 'html.parser')


# movieInfoList = soup.find('ol', attrs={'class': 'movie_list'}).find_all('li')
# for movieInfo in movieInfoList:
#     movieImg = movieInfo.find('img').attrs.get('src')

#     # print(f'이미지: {movieImg}')
#     doc = {
#         'movieImg': movieImg
#     }
# db.mainMovie.insert_one(doc)


# ul = soup.find('ul', class_="lst_detail_t1")
# images = ul.select('li> div > a >img')
# print(len(images))

# for image in images:

#     doc = {
#         'movieImg': image['src']
#     }

# db.mainMoviePage1.insert_one(doc)


@ blueprint.route("/")  # <- 데코레이터
def main_template():

    return render_template("main.html")


# @blueprint.route("/postNaverMovie", methods=['POST'])
# def main_movies():


@ blueprint.route("/showNaverMovie", methods=['GET'])
def show_main_movies():
    naverMovie_List = list(db.main.find({}, {'_id': False}))
    return jsonify({'naverMovies': naverMovie_List})


@blueprint.route("/showDaumMovie", methods=["GET"])
def show_main_daum_movies():
    daumMovie_List = list(db.mainMovie.find({}, {'_id': False}))
    return jsonify({'daumMovies': daumMovie_List})
