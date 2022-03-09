let id = $('#id');
let pw = $('#pw');
let btn = $('#btn');

// $(btn).on('click', function () {
//     if ($(id).val() == "") {
//         $(id).next('label').addClass('warning');
//         setTimeout(function () {
//             $('label').removeClass('warning');
//         }, 1500);
//     } else if ($(pw).val() == "") {
//         $(pw).next('label').addClass('warning');
//         setTimeout(function () {
//             $('label').removeClass('warning');
//         }, 1500);
//     }
// })
// {% if msg %}
//     alert("{{ msg }}")
// {% endif %}

function sign_in() {
    let username = $("#id").val();
    let password = $("#pw").val();
    console.log(username,password)
    $.ajax({
        type: "POST",
        url: "/login_Done/",
        data: {
            username_give: username,
            password_give: password
        },
        success: function (response) {

            if (response['result'] == 'success') {
                $.cookie('mytoken', response['token'], {path: '/'});
                window.location.replace("/mypage")
            } else {
                alert(response['msg'])
            }
        }
    });
}