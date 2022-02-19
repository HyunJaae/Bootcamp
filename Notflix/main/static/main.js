const nav=document.getElementById('nav');

window.addEventListener('scroll',()=>{
    if(window.scrollY >=100){
        nav.classList.add('nav__black')
    }else{
        nav.classList.remove('nav__black')
    }
})



$(document).ready(function () {
    showNaverMovies()
   

});

function showNaverMovies(){
    
        $.ajax({
            type: "GET",
            url: "/showNaverMovie",
            data: {},
            success: function (response) {
                let rows = response['naverMovies']

                for(let i=0; i<rows.length; i++){
                    let image=rows[i]['movieImg']
                    let temp_html=`<img src=${image} class="row__poster ">`              
               
                    $('#air_movies').append(temp_html)
            }
        }
        });
    
}