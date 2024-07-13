

$(document).ready(function(){

    let navLeftWidth = $('.nav-right').innerWidth()
    let navRightWidth = $('.nav-left').innerWidth()
    let navWidth = $('.nav').innerWidth()
    
    $('.home').animate({paddingLeft: navLeftWidth},300)

    
    $('.nav').animate({left: -navLeftWidth},300)
    // Navbar toggle
    $('.icon-toggle i').click(function(){
        let navLeftWidth = $('.nav-right').innerWidth()
        // console.log(navLeftWidth);
        if($('.nav').css('left')=='0px'){
            $('.nav').animate({left: -navLeftWidth},500)
            $('.home').animate({paddingLeft: navRightWidth},300)

        }else{
            $('.nav').animate({left: '0px'},500)
            $('.home').animate({paddingLeft: navWidth},300)
        }
    })
    // Fetch data
    async function fetchData(){
        let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
        let data = await fetch(api)
        let dataJson = await data.json();

        console.log( dataJson.meals);
        displayMeals(dataJson.meals)
    }

    function displayMeals(data){
        data = data.slice(0,20)
        box=``
        console.log( data.length );
        for(let i = 0 ; i < data.length ; i++){
            box+=`
                <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                    <div class="item">
                        <img class="w-100 data-image" src='${data[i].strMealThumb}' alt="">
                         <div class="img-layer">
                            <h2>${data[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            `
        }
        document.getElementById('mainData').innerHTML = box
    }








    fetchData()    
})



