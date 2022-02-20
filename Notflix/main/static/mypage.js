function open__form() {
    $('#open__form').hide()
    $('#mypage_form').show()
    $('#save').show()
    document.getElementById('title__message').style.display = 'none'
    document.getElementById('movie_card').style.display = 'none'
}

function save() {
    $('#title__message').show()
    $('#open__form').show()
    $('#mypage_form').hide()
    $('#save').hide()
    document.getElementById('movie_card').style.display = 'block'

    let link = $('#link_input').val()
    let star = $('#star_select').val()
    let comment = $('#comment_input').val()

    if (link == '') {
        alert('link를 입력해주세요')

    }else if (star == '') {
        alert('평점을 입력해주세요')

    }else if (comment == '') {
        alert('감상평을 입력해주세요')

    }else {
        $.ajax({
            type: "POST",
            url: "/my_page/save",
            data: {
                link_give: link,
                star_give: star,
                comment_give: comment
            },
            success: function (response) {
                    alert(response['msg'])
                    window.location.reload()
                
            }
        });
    }
}

$(document).ready(function(){
    data_post();
  });

function data_post(){
    $.ajax({
            type: "GET",
            url: "/my_page/data_post",
            data: {},
            success: function(response) {
                let temp_html =``

                let card = response['data_page']

                for(let i = 0 ; i < card.length ; i++){
                    let num = card[i]['post_num']
                    let img = card[i]['img']
                    let name = card[i]['name']
                    let star = card[i]['star']
                    let comment = card[i]['comment']
                    let star_image = "⭐".repeat(star)

                    let temp_html = `<div class="col-sm-4">
                                        <div class="card h-80">
                                            <img src="${img}"
                                                class="card-img-top">
                                            <div class="card-body">
                                                <h5 class="card-title">${name}</h5>
                                                <p class = "star">${star_image}</p>
                                                <p class="comment">${comment}</p>
                                                <button id="deleteMovie" onclick="deleteMovie(${num})" type="button"
                                                    class="delete btn btn-dark close_box">삭제</button>
                                                <button id="correctionMovie" onclick="popUpCorrection(${num})" type="button"
                                                    class="correction btn btn-dark close_box">수정</button>
                                            </div>
                                        </div>
                                    </div>`
                $('#card-box').append(temp_html)

                }
        }
    });
}

function deleteMovie(num){
    $.ajax({
        type: "POST",
        url: "/my_page/delete",
        data: {num_give : num
        },
        success: function (response) {
                alert(response['msg'])
                window.location.reload()
        }
    });
}

//수정을 누르면 팝업이 뜬다. 팝업창에 입력한 link , 평점 , comment가 변경된 데이터로 저장된다.
//수정 클릭 -> 팝업
//link , 평점 , comment가 변경됨 (기존의 data를 index해야함)

//기존의 data를 server측으로 보내줌 , 수정할 수 있는 popup을 띄워줌 
function popUpCorrection(num){
    //연결하고싶은url , 팝업창 크기 , 화면 위치 , 창 옵션
    const url = "/my_page/correction_page"; 
    var name = "수정하기"
    var option = "width =600  , height = 600 , left = 450 , top =100 , location = no, scrollbars=no, status=yes, resizable=no, titlebar=no , fullscreen=no"; 
    
    //popUpCorrection 에서 팝업을 띄우며 카드의 num을 local storage로 보내줌
    //등록된 url 및 window 속성 기준으로 팝업창을 연다. 
    window.open(url , name , option , localStorage.setItem('post_num' , num) );
    
}

//popup창에서의 데이터를 가져와서 다시 보내줌
//클라이언트 측에서 데이터를 바꿔끼워서 준다.
function correctionMovie(){
        //수정 데이터
        var correctionLink = $("#correction_input").val();
        var correctiontStar = $("#correction_star_select").val();
        var correctionComment = $("#correction_comment_input").val();
        var post_num = localStorage.getItem('post_num')
        console.log(post_num + correctionLink + correctiontStar + correctionComment)

        $.ajax({
            type: "POST",
            url: "/my_page/correction_update",
            data: {
                num_give : post_num,
                correction_link_give : correctionLink,
                correction_star_give : correctiontStar,
                correction_comment_give : correctionComment
            },
            success: function (response) {
                    alert(response['msg'])
                    self.close() 
                    opener.document.location.reload();
            }
        });
}