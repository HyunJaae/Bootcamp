from main import * #from main import * : main에 선언된 모든 값을 가져온다 , __init__ file에 선언된 라이브러리를 가져와 사용할 수 있음.
from flask import Blueprint

#객체 = Blueprint("name" , __name__ , url_prefix="") : (이름, 모듈명, URL 프리픽스 값)
#이름은 url_for함수에서 사용되며 , 모듈명은 init.py에서 선언한 모듈을 뜻함 , url_prefix="주소" 주소에는 브라우져에서 선언될 url을 입력한다 

blueprint = Blueprint("my_page" , __name__ , url_prefix="/my_page")

@blueprint.route("/") #<- 데코레이터
def mypage_template():
    return render_template("my_page.html")

#이름을 받아와 리턴해줘 마이페이지에 이름이 표시되게한다.
  

#user_index가 1이면 POST로 받아온 정보들을 user_index1로 db에 저장한다.
@blueprint.route("/save_post", methods=["POST"]) #Update session에 담겨있는 user_index를 받아 user_index를 별도로 할당해 저장할 것 
def input_save(): # user의 input 정보 저장하기
  link_receive = request.form['link_give']
  star_receive = request.form['star_give']
  comment_receive = request.form['comment_give']
  
  return jsonify({'msg':'POST 연결 완료!'})

#user_index에 따라 저장돼 있는 데이터들을 temp_html로 붙힐 수 있게 리턴한다.


@blueprint.route("/user_get", methods=["GET"])
def user_get(): # db에서 user정보 가져오기
  user_get = list(db.users.find({},{'_id':False}))
  return jsonify({'user': user_get})
 