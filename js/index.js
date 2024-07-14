let navLinks = Array.from(document.querySelectorAll(".nav-link"));
let byFirst = document.getElementById("byFirst");
let byName = document.getElementById("byName");
let navLeftWidth = $(".nav-right").innerWidth();
let navRightWidth = $(".nav-left").innerWidth();
let navWidth = $(".nav").innerWidth();
byName.addEventListener("input", function () {
  // console.log(byFirst.value);
  fetchData(byName.value, "name");
});
byFirst.addEventListener("input", function () {
  // console.log(byFirst.value);
  fetchData(byFirst.value, "firstChar");
});
// Navbar toggle
// $(".main").animate({ paddingLeft: navLeftWidth }, 300);
$(".nav").animate({ left: -navLeftWidth }, 300);
$(".icon-toggle i").click(function () {
  let navLeftWidth = $(".nav-right").innerWidth();
  // console.log(navLeftWidth);
  if ($(".nav").css("left") == "0px") {
    $(".nav").animate({ left: -navLeftWidth }, 500);
    $(".main").animate({ paddingLeft: navRightWidth }, 300);
  } else {
    $(".nav").animate({ left: "0px" }, 500);
    $(".main").animate({ paddingLeft: navWidth }, 300);
  }
});

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    console.log(navLinks[i].innerHTML);
    if (navLinks[i].innerHTML == "Search") {
      // do some code
      document.getElementById("searchSection").classList.remove("d-none");
      $(".nav").animate({ left: -navLeftWidth }, 500);
      $(".main").animate({ paddingLeft: navRightWidth }, 300);
    }
    if (navLinks[i].innerHTML == "Home") {
      // do some code
      document.getElementById("searchSection").classList.add("d-none");
      $(".nav").animate({ left: -navLeftWidth }, 500);
      $(".main").animate({ paddingLeft: navRightWidth }, 300);
      fetchData("", "home");
    }
    if (navLinks[i].innerHTML == "Categories") {
      // do some code
      document.getElementById("searchSection").classList.add("d-none");
      $(".nav").animate({ left: -navLeftWidth }, 500);
      $(".main").animate({ paddingLeft: navRightWidth }, 300);
      fetchData("", "category");
    }
    if (navLinks[i].innerHTML == "Ingredients") {
      document.getElementById("searchSection").classList.add("d-none");
      $(".nav").animate({ left: -navLeftWidth }, 500);
      $(".main").animate({ paddingLeft: navRightWidth }, 300);
      fetchData("", "ingredients");
    }
    if (navLinks[i].innerHTML == "Area") {
      document.getElementById("searchSection").classList.add("d-none");
      $(".nav").animate({ left: -navLeftWidth }, 500);
      $(".main").animate({ paddingLeft: navRightWidth }, 300);
      fetchData("", "area");
    }
  });
}

// Fetch data
async function fetchData(searchKey, apiKey) {
  let api = ``;

  if (searchKey) {
    if (apiKey && apiKey == "name") {
      api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
    } else if (apiKey && apiKey == "firstChar") {
      api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchKey}`;
    }
  } else if (apiKey && apiKey == "category") {
    api = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson.categories);
    displayCategories(dataJson.categories);
  } else if (apiKey && apiKey == "ingredients") {
    api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson.meals.slice(0, 25));
    displayIngredients(dataJson.meals.slice(0, 24));
  } else if (apiKey && apiKey == "area") {
    api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson.meals.slice(0, 25));
    displayAreas(dataJson.meals.slice(0, 24));
  } else {
    api = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson.meals);
    displayMeals(dataJson.meals);
  }
}
// Displays
function displayMeals(data) {
  data = data.slice(0, 20);
  box = ``;
  //   console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    box += `
                <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                    <div class="item">
                        <img class="w-100 data-image" src='${data[i].strMealThumb}' alt="">
                         <div class="img-layer">
                            <h2>${data[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            `;
  }
  document.getElementById("mainData").innerHTML = box;
}
function displayCategories(data) {
  data = data.slice(0, 20);
  box = ``;
  // console.log(data.length);
  // console.log(data[2].strCategoryDescription.split(' ').slice(0,20));
  for (let i = 0; i < data.length; i++) {
    box += `
                  <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                      <div class="item">
                          <img class="w-100 data-image" src='${
                            data[i].strCategoryThumb
                          }' alt="">
                           <div class="img-layer">
                              <h2>${data[i].strCategory}</h2>
                              <p class="">${data[i].strCategoryDescription
                                .split(" ")
                                .slice(0, 20)
                                .join(" ")}</p>
                          </div>
                      </div>
                  </div>
              `;
  }
  document.getElementById("mainData").innerHTML = box;
}
function displayIngredients(data) {
  box = ``;
  // console.log(data.length);
  // console.log(data[2].strCategoryDescription.split(' ').slice(0,20));
  for (let i = 0; i < data.length; i++) {
    box += `
                  <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                      <div class="item ingred">
                          <i class="fa-solid fa-utensils" style="color: #B197FC;"></i>
                              <h2>${data[i].strIngredient}</h2>
                           <div class="img-layer">
                              <p class="">${data[i].strDescription
                                .split(" ")
                                .slice(0, 20)
                                .join(" ")}</p>
                          </div>
                      </div>
                  </div>
              `;
  }
  document.getElementById("mainData").innerHTML = box;
}
function displayAreas(data) {
    box = ``;
    // console.log(data.length);
    // console.log(data[2].strCategoryDescription.split(' ').slice(0,20));
    for (let i = 0; i < data.length; i++) {
      box += `
                    <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                        <div class="item ingred">
                            <i class="fa-solid fa-chart-area" style="color: #B197FC;"></i>
                                <h2>${data[i].strArea}</h2>
                            
                        </div>
                    </div>
                `;
    }
    document.getElementById("mainData").innerHTML = box;
  }
  
fetchData("",'home');
