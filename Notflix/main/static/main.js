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
    showDaumMovies()

});

// 메인 페이지에서 네이버 상영작 가져오기 
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

function showDaumMovies(){
    $.ajax({
        type: "GET",
        url: "/showDaumMovie",
        data: {},
        success: function (response) {
            let rows = response['daumMovies']

            for(let i=0; i<rows.length; i++){
                let image=rows[i]['movieImg']
                let temp_html=`
                <div class=" banner__contents carousel-item">
                <img src=${image} >
               </div>`              
           
                $('#carouselExampleControls').append(temp_html)
        }
    }
    });
}

// 슬라이더 버튼 js 
const swiper = new Swiper('.swiper', {
    // Optional parameters
   
    loop: true,
  
    
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    
 
  });