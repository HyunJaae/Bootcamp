# from main import * : main에 선언된 모든 값을 가져온다 , __init__ file에 선언된 라이브러리를 가져와 사용할 수 있음.

from operator import le
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
url3 = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=2020%EB%85%84+%EC%98%81%ED%99%94+%EC%88%9C%EC%9C%84"
blueprint = Blueprint("main", __name__, url_prefix="/")
response = requests.get(url3)
soup = BeautifulSoup(response.content, 'html.parser')


# 2020년 인기 영화 크롤링 코드

# Naver2020List=soup.find('div',attrs={'class':'_content'}).find_all('li')
# for naver2020 in Naver2020List:
#     naver2020Img=naver2020.find('img').attrs['src']
#     naver2020Link=naver2020.find('a').attrs['href']

#     doc={
#         'naver2020Img':naver2020Img,
#         'naver2020Link':"https://search.naver.com/search.naver"+naver2020Link
#     }
# db.naver2020Movie.insert_one(doc)


# 네이버 상영 영화 크롤링 코드

# naverMovieInfoList = soup.find('ul', attrs={'class':'lst_detail_t1'}).find_all('li')
# for naverMovieInfo in naverMovieInfoList:
#     images = naverMovieInfo.find('img').attrs['src']
#     link=naverMovieInfo.find('a').attrs['href']

#     doc={
#         'movidImg':images,
#         'movieLink':"https://movie.naver.com/"+link
#     }

# db.MainMoviesPage.insert_one(doc)
# db.MainMoviesPage.drop()


# 다음 영화 예매율 순위 크롤링 코드

# movieInfoList = soup.find('ol', attrs={'class': 'movie_list'}).find_all('li')
# for movieInfo in movieInfoList:
#     movieImg = movieInfo.find('img').attrs['src']
#     movieLink =movieInfo.find('a').attrs.get('href')
#     movieTitle=movieInfo.find('a',attrs={'class':'tit_main'})
#     # print(f'이미지: {movieImg}')
#     doc = {
#         'movieLink': "https://search.daum.net/search?"+movieLink,
#         'movieImg': movieImg,
#         'movieTitle':movieTitle.get_text()
#     }

# print("https://search.daum.net/search?"+movieLink)

# db.mainMovie.insert_one(doc)


@ blueprint.route("/")  # <- 데코레이터
def main_template():

    return render_template("main.html")


# @blueprint.route("/postNaverMovie", methods=['POST'])
# def main_movies():


@ blueprint.route("/showNaverMovie", methods=['GET'])
def show_main_movies():
    naverMovie_List = list(db.MainMoviesPage.find({}, {'_id': False}))
    return jsonify({'naverMovies': naverMovie_List})

# 완전 큰 메인


@blueprint.route("/showDaumMovie", methods=["GET"])
def show_main_daum_movies():
    daumMovie_List = list(db.MainPageImg.find({}, {'_id': False}))
    return jsonify({'daumMovies': daumMovie_List})


#  중간 크기 메인
@blueprint.route("/showDaumMovieMain", methods=["GET"])
def show_main_daum_movies_middle():
    daumMovieMain_List = list(db.mainMovie.find({}, {'_id': False}))
    return jsonify({'daumMoviesMain': daumMovieMain_List})

# 2020인기 영화


@blueprint.route("/showNaver2020Movie", methods=["GET"])
def show__naver2020Movie():
    naver2020_List = list(db.naver2020Movie.find({}, {'_id': False}))
    return jsonify({'naver2020List': naver2020_List})


# 완전 큰 메인 입력할 때 씀
# @blueprint.route("/MainPagemovie",methods=["POST"])
# def check_post():

#     url_receive = request.form['url_give']
#     Movie_receive=request.form['Movieurl__give']

#     doc={
#             'Imageurl':url_receive,
#             'AdressUrl':Movie_receive
#         }
#     db.MainPageImg.insert_one(doc)
