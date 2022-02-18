const nav=document.getElementById('nav');

window.addEventListener('scroll',()=>{
    if(window.scrollY >=100){
        nav.classList.add('nav__black')
    }else{
        nav.classList.remove('nav__black')
    }
})

// $(document).ready(function () {
//     showMovies()
   

// });

function showMovies(){
    
    
        $.ajax({
            type: "GET",
            url: "/showMovies",
            data: {},
            success: function (response) {
                alert(response["재시작"])
                window.location.reload()
            }
        });
    
}