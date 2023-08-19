function logout(){
    $.removeCookie('mytoken', {path: '/'})
    window.location.replace('/main')
}
/*
로그아웃 버튼 html 태그입니다.
<button type="button" onclick="logout()">logout</button>

로그아웃 함수 연결 태그 입니다.
<script src="{{ url_for('static', filename='logout.js')}}"></script>

기능 사용 시 연결이 필요한 태그입니다.
-- jquery
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
-- 쿠키
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
*/