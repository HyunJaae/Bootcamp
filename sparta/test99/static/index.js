function hey() {
    $.ajax({
        type: "POST",
        url: "/test",
        data: { title_give:'봄날은간다' },
        success: function(response){
            alert(response['msg'])
        }
    })
}