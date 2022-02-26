

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
    showDaumMovie()
    showDaumMoviesMain()
    showNaver2020Movies()

});

// 메인 페이지에서 네이버 상영작(작은 포스터) 가져오기 
function showNaverMovies(){
    
        $.ajax({
            type: "GET",
            url: "/showNaverMovie",
            data: {},
            success: function (response) {
                let rows = response['naverMovies']

                for(let i=0; i<rows.length; i++){
                    let image=rows[i]['movidImg']
                    let mLink=rows[i]['movieLink']
                    let temp_html=`<a href=${mLink} class="row__poster "><img src=${image} ></a>`              
               
                    $('#air_movies').append(temp_html)
            }
        }
        });
    
}
// 중간 크기 메인 
function showDaumMoviesMain(){
    $.ajax({
        type: "GET",
        url: "/showDaumMovieMain",
        data: {},
        success: function (response) {
            let rows = response['daumMoviesMain']

            for(let i=0; i<rows.length; i++){
                let movieLink=rows[i]['movieLink']
                let movieImg=rows[i]['movieImg']
                let temp_html=`<a href=${movieLink} class="row__poster row__posterLarge"><img src=${movieImg} ></a>`              
           
                $('#row_posters_middle').append(temp_html)
        }
    }
    });
}
new Carousel(document.querySelector('#carousel-banner'));



// 완전 메인 포스터 
function showDaumMovie(){
    $.ajax({
        type: "GET",
        url: "/showDaumMovie",
        data: {},
        success: function (response) {
            let rows = response['daumMovies']

            for(let i=0; i<rows.length; i++){
                let image=rows[i]['Imageurl']
                let MimageAddress=rows[i]['AdressUrl']
                
                let temp_html=            
               `<div class= "banner__contents carousel-item   data-bs-interval="200000"> 
                 <a href=${MimageAddress}  ><img src=${image} ></a>
               </div>`
                           
                      
                $('#carouselExampleControls').append(temp_html)
                
                
        }
    }
    });
}

//2020인기 영화 
function showNaver2020Movies(){
    
    $.ajax({
        type: "GET",
        url: "/showNaver2020Movie",
        data: {},
        success: function (response) {
            let rows = response['naver2020List']

            for(let i=0; i<rows.length; i++){
                let image2020=rows[i]['naver2020Img']
                let mLink2020=rows[i]['naver2020Link']
                let temp_html=`<a href=${mLink2020} class="row__poster "><img src=${image2020} ></a>`              
           
                $('#naver2020Movie').append(temp_html)
        }
    }
    });

}
  
// 메인에 넣을 이미지 주소 db에 넣기 
//   function posting() {
//     let url = $('#url').val()
//     let Movieurl=$('#Movieurl').val()
    
//     $.ajax({

//         type: 'POST',
//         url: '/MainPagemovie',
//         data: {url_give: url, Movieurl__give:Movieurl},
//         success: function (response) {
//             alert(response['msg'])
//             window.location.reload()
//         }
//     });
// }
