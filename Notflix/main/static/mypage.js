// function save_member() {
//     let name = $('#name_input').val();
//     let id = $('#id_input').val();
//     let b = $('#b_input').val();
    
//     if ($('#name_input').val() == '') {
//         alert('이름을 입력해주세요.')
//         return;
//     } else if ($('#id_input').val() == '') {
//         alert('ID를 입력해주세요')
//         return;
//     } else if ($('#b_input').val() == '') {
//         alert('비밀번호를 입력해주세요')
//         return;
//     }

//     $.ajax({
//         type: 'POST',
//         url: '/my_page/save_member',
//         data: {
//             name_give: name,
//             id_give: id,
//             b_give: b
//         },
//         success: function (response) {
//             console.log(name, id,b)
//         }
//     });
// }

function open_box(){
    $('#mypage-form').show()
    $('#save_box').show()
    $('#open_box').hide()
    document.getElementById('message').style.display = 'none'
    document.getElementById('my-card').style.display = 'none'
}

function save_box(){
    $('#mypage-form').hide()
    $('#open_box').show()
    $('#message').show()
    $('#save_box').hide()
    document.getElementById('my-card').style.display = 'block'

    let link = $('#link_input').val()
    let star = $('#star').val()
    let comment = $('#comment').val()

    $.ajax({
        type: "POST",
        url: "/my_page/save_post",
        data: {link_give : link , star_give : star , comment_give : comment},
        success: function (response) {
            alert(response['msg'])
    }
});

}

function user_get() {
    $.ajax({
            type: "GET",
            url: "/my_page/user_get",
            data: {},
            success: function (response) {
                console.log(response)
        }
    });
}