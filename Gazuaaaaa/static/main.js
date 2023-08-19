function buy() {
    let stock_name = $("#card-header-title").val()
            let stock_cost = $("#content").val()
            $.ajax({
                type: "POST",
                url: "/my_stock",
                data: {
                    'stock_name_give': stock_name,
                    stock_cost_give: stock_cost
                },
                success: function (response) {
                    alert('msg')
                }
            })
}

$(document).ready(function (){
    show_kospi()
    show_kosdaq()
    $("#buying_kos_pi").hide()
    $("#buying_kos_daq").hide()
});

function show_kospi() {
    $.ajax({
        type: 'GET',
        url: '/main/ko_spi',
        data: {},
        success: function (response) {
            let kospis = response['kospi']
             console.log(kospis)
            for (let i = 0; i < kospis.length; i++) {
                let rank = kospis[i]['rank']
                let stock_nm = kospis[i]['stock_nm']
                let price = kospis[i]['re_price']
                let stock_url = kospis[i]['url']
                let temp_html = `
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title card_header_kospi">
                          현재 순위 ${rank}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                             ${stock_nm} : ${price}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item" onclick="buy()">매수</a>
                        <a href="${stock_url}" class="card-footer-item">다음 정보</a>
                    </footer>
                </div>`
                $("#kos_pi_box").append(temp_html)
            }

        }
    })
}


function show_kosdaq() {
    $.ajax({
        type: 'GET',
        url: '/main/kos_daq',
        data: {},
        success: function (response) {
            let kosdaq = response['kosdaq']

            for (let i = 0; i < kosdaq.length; i++) {
                let rank = kosdaq[i]['rank']
                let stock_nm = kosdaq[i]['stock_nm']
                let price = kosdaq[i]['re_price']
                let stock_url = kosdaq[i]['url']
                let temp_html = `
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title card_header_kosdaq">
                          현재 순위 ${rank}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                             ${stock_nm}: ${price}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item" onclick="buy()">매수</a>
                        <a href="${stock_url}" class="card-footer-item">다음 정보</a>
                    </footer>
                </div>`
                $("#kos_daq_box").append(temp_html)
            }
            }
    })
}
//로그아웃 함수
function sign_out() {
    $.removeCookie('mytoken', {path: '/'})
    alert("로그아웃 하셨습니다")
    window.location.replace('/login')
}

let count = 1;
function live_btn() {
    if (count % 2 == 0) {
        $('#live_box').show();
    } else {
        $('#live_box').hidden();
    }
    count += 1;
}

function open_box(){
    $("#buying_kos_pi").show()
}
function close_box(){
    $("#buying_kos_pi").hide()
}
function opend_box2(){
$("#buying_kos_daq").show()
}
function close_box2(){
    $("#buying_kos_daq").hide()
}

function buying_kos() {
    let stock_nm = $("#input_stock").val()
    let price = $("#input_price").val()

    $.ajax({
        type: 'POST',
        url: '/post_kos',
        data: {stock_nm_give: stock_nm, price_give: price},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });


}