from main import *
import requests
from bs4 import BeautifulSoup

def link_select(link_data):
    # URL을 읽어서 HTML를 받아오고,
  headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
  data = requests.get(link_data ,headers=headers)
  
  # HTML을 BeautifulSoup이라는 라이브러리를 활용해 검색하기 용이한 상태로 만듦
  soup = BeautifulSoup(data.text, 'html.parser')

  # select를 이용해서, tr들을 불러오기
  link = soup.select_one('#content > div.article > div.mv_info_area > div.poster > a')
  img = link.select_one('img')['src']
  name = link.select_one('img')['alt']
  
  print(img , name)
  
test = link_select('https://movie.naver.com/movie/bi/mi/basic.naver?code=191547')

