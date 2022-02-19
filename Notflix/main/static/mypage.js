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
                                                <p class="card-text"></p>
                                                <p>평점 : ${star_image}</p>
                                                <p class="mycomment">${comment}</p>
                                                <button id="deleteMovie" onclick="deleteMovie()" type="button"
                                                    class="delete btn btn-dark close_box">삭제</button>
                                                <button id="correctionMovie" onclick="correctionMovie()" type="button"
                                                    class="correction btn btn-dark close_box">수정</button>
                                            </div>
                                        </div>
                                    </div>`
                $('#card-box').append(temp_html)

                }
        }
    });
}

function deleteMovie(){
    var selectName = $(".card-title").html();
    $.ajax({
        type: "POST",
        url: "/my_page/delete",
        data: {name_find : selectName
        },
        success: function (response) {
                alert(response['msg'])
                window.location.reload()
        }
    });
}


function correctionMovie(){
    var selectCard = $("#my-card").html();
    $.ajax({
        type: "POST",
        url: "/my_page/delete",
        data: {name_find : selectName
        },
        success: function (response) {
                alert(response['msg'])
                window.location.reload()
        }
    });
}