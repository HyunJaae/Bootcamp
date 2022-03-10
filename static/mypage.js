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
