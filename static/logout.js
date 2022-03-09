function logout(){
    $.removeCookie('mytoken', {path: '/'})
    window.location.replace('/main')
}
// 로그아웃 버튼 html 태그입니다.
// <button type="button" onclick="logout()">logout</button>

// 로그아웃 함수 연결 태그 입니다.
// <script src="{{ url_for('static', filename='logout.js')}}"></script>