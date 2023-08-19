//   회원가입
function sign_up() {
    let username = $("#input-username").val()
    let password = $("#input-password").val()
    let password2 = $("#input-password2").val()
    let name = $("#input-name").val()
    console.log(username, password, password2,name)


    if ($("#help-id").hasClass("is-danger")) {
        alert("아이디를 다시 확인해주세요.")
        return;
    }
    else if (!$("#help-id").hasClass("is-success")) {
        alert("아이디 중복확인을 해주세요.")
        return;
    }

    // {#비번이 빈칸인지#}
    if (password == "") {
        $("#help-password").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password").focus()
        return;
    } else if (!is_password(password)) {
        $("#help-password").text("비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자").removeClass("is-hidden").addClass("is-danger")
        $("#input-password").focus()
        return
    } else {
        $("#help-password").text("사용할 수 있는 비밀번호입니다.").removeClass("is-danger").addClass("is-success")
    }
    if (password2 == "") {
        $("#help-password2").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else if (password2 != password) {
        $("#help-password2").text("비밀번호가 일치하지 않습니다.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else {
        $("#help-password2").text("비밀번호가 일치합니다.").removeClass("is-danger").addClass("is-success")
    }
    if(name==""){
        $("#help-name").text("이름을 입력해주세요").removeClass("is-hidden").addClass("is-danger")
        $("#input-name").focus()
        return;
    }
    else {
        $("#help-name").text("환영합니다").addClass("is-success")
    }
        $.ajax({
            type: "POST",
            url: "/sign_up/save",
            data: {
                username_give: username,
                password_give: password,
                name_give: name
            },
            success: function (response) {
                alert("회원가입을 축하드립니다!")
                window.location.replace("/login")
            },
            error:function (){
                alert("에러")
            }

        });

}


function is_nickname(asValue) {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
}



//중복확인 클라이언트
function check_dup() {
    let username = $("#input-username").val()
    console.log(username)
    if (username == "") {
        $("#help-id").text("아이디를 입력해주세요.").removeClass("is-hidden").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
     if (!is_nickname(username)) {
        $("#help-id").text("아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").removeClass("is-hidden").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
    $("#help-id").addClass("is-loading")
    $("#help-id").removeClass("is-danger")
    $.ajax({
        type: "POST",
        url: "/sign_up/check_dup",
        data: {
            username_give: username
        },
        success: function (response) {

            if (response["exists"]) {
                $("#help-id").text("이미 존재하는 아이디입니다.").removeClass("is-hidden").addClass("is-danger")
                $("#input-username").focus()
            } else {
                $("#help-id").text("사용할 수 있는 아이디입니다.").removeClass("is-hidden").addClass("is-success")
            }
            $("#help-id").removeClass("is-loading")

        }
    });
}