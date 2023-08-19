from selenium import webdriver
from bs4 import BeautifulSoup

from pymongo import MongoClient

import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.d6z8z.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.gazuaaa



driver = webdriver.Chrome('/Users/kimtaehyeon_macbookm1/Desktop/hanghae/webdriver/chromedriver')

# url에 접근한다.
driver.implicitly_wait(3)

driver.get('https://finance.daum.net/domestic/market_cap?market=KOSDAQ')
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
stocks = soup.select('#boxMarketCap > div.box_contents > div > table > tbody > tr')

for stock in stocks:
  r = stock.select_one('span')
  if r is not None:
    rank = r.text
    stock_nm = stock.select_one('a').text
    re_price = stock.select_one('span.num').text.strip()
    links = stock.find_all('a')
    for l in links:
      href = l.attrs['href']
      url = 'https://finance.daum.net'+href
      driver.quit()

      doc = {
        'rank': rank,
        'stock_nm': stock_nm,
        're_price': re_price,
        'url': url
      }
      db.kosdaq.insert_one(doc)










