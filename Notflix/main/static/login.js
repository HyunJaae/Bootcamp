let id = $('#id');
let pw = $('#pw');
let btn = $('#btn');

$(btn).on('click', function() {
    if($(id).val() == "") {
        $(id).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning');
        },1500);
    } else if($(pw).val() == "") {
        $(pw).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning');
        },1500);
    }
})

<<<<<<< HEAD
// function loginDone() {
//     $.ajax({
//         type: 'GET',
//         url: '/done',
//         data: {},
//         success: function (response) {
//             let rows = response['users']
//             for(i = 0; i < len(rows); i++){
//                 let Id = rows[i]['name']
//                 let Pw = rows[i]['password']

//                 if (Id == $(id).val() || Pw == $(pw).val()){
//                     location.href = "main.html"
//                 } else {
//                     location.reload();
//                 }
//             }
//         }
//     })
// }
=======
// /login/save_member

>>>>>>> ce90033feeac3314884e369de8423f101ec1e719
