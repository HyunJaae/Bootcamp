    $(document).ready(function () {
        $('#stock-list').show()

    });

    // 나의 매수 목록 버튼 클릭시 데이터 업데이트
    function showhide() {
        window.location.reload()
        // if ($('#stock-list').css('display') == 'none') {
        //     $('#stock-list').show();
        // } else {
        //     $('#stock-list').hide();
        //     window.location.reload()
        // 주식데이터 정보 보여주기
        $.ajax({
            type: "GET",
            url: "/mypage",
            data: {},
            success: function (response) {
                let rows = response['stocks']
                for (let i = 0; i < rows.length; i++) {
                    let stock = rows[i]['stock']
                    let price = rows[i]['price']

                    let temp_html = `<div id="stock-detail" class="card" style="width: 18rem;">
                                                <div class="card-body">
                                                    <h5 class="card-title">${stock}</h5>
                                                    <h6 class="card-subtitle mb-2 text-muted">${price}</h6>
                                                    <button onclick="sell()" id="button" type="button" class="btn btn-outline-danger">매도</button>
                                                </div>
                                            </div>`
                    $('#stock-detail').append(temp_html)
                }
            }
        })
    }
    // 마이페이지 상단 우측 드롭다운 매뉴
 function sign_out2() {
    $.removeCookie('mytoken', {path: '/'})
    alert("로그아웃 하셨습니다")
    window.location.replace('/login')
}

    function goJoin() {
        window.location.href = "/join"
    }

    // 매도
    function sell() {
        $.ajax({
            type: 'POST',
            url: '/mypage/sell',
            data: {},
            success: function (response) {
                alert(response["msg"])
            }
        })
    }



    function show_mystock(username){

         $.ajax({
        type: "GET",
        url: "/get_mystock",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let posts = response["posts"]
                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    let time_post = new Date(post["date"])
                    let time_before = time2str(time_post)

                    let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"
                    let count_heart = post['count_heart']
                    let html_temp = `
             `
                    $("#post-box").append(html_temp)
                }
            }
        }
    })
}

    }
