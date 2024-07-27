let navLinks = Array.from(document.querySelectorAll(".nav-link"));
let byFirst = document.getElementById("byFirst");
let byName = document.getElementById("byName");
let navLeftWidth = $(".nav-right").innerWidth();
let navRightWidth = $(".nav-icon").innerWidth();
let navWidth = $(".nav").innerWidth();
let closeDetails = document.querySelector("#closeDetails");

closeDetails.addEventListener("click", function () {
  document.getElementById("mealDetails").classList.add("d-none");
  document.getElementById("homeSection").classList.remove("d-none");
});
console.log(navLeftWidth);
byName.addEventListener("input", function () {
  // console.log(byFirst.value);
  fetchData(byName.value, "name");
});
byFirst.addEventListener("input", function () {
  // console.log(byFirst.value);
  fetchData(byFirst.value, "firstChar");
});
// Navbar toggle
$(".main").animate({ paddingLeft: navRightWidth }, 300);
$(".nav").animate({ left: -navLeftWidth }, 300);
$(".icon-toggle i").click(function () {
  let navLeftWidth = $(".nav-right").innerWidth();
  console.log(navLeftWidth);

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
    if (navLinks[i].innerHTML == "Contact-Us") {
      document.getElementById("searchSection").classList.add("d-none");
      document.getElementById("contact").classList.remove("d-none");
      document.getElementById("homeSection").classList.add("d-none");

      $(".nav").animate({ left: -navLeftWidth }, 500);
      $(".main").animate({ paddingLeft: navRightWidth }, 300);
      
    }
  });
}

// Fetch data
async function fetchData(searchKey, apiKey) {
  let api = ``;

  if (searchKey) {
    if (apiKey && apiKey == "name") {
      api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
      let data = await fetch(api);
      let dataJson = await data.json();
      console.log(dataJson.meals);
      displayMeals(dataJson.meals);
    } else if (apiKey && apiKey == "firstChar") {
      api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchKey}`;
      let data = await fetch(api);
      let dataJson = await data.json();
      console.log(dataJson.meals);
      displayMeals(dataJson.meals);
    }
  }
  // https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
  if (apiKey && apiKey == "home") {
    api = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson.meals);
    displayMeals(dataJson.meals);
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
  }

  if (searchKey && apiKey == "categorymeals") {
    console.log(searchKey);
    api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchKey}`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson.meals.slice(0, 25));
    displayMeals(dataJson.meals.slice(0, 25));
  } else if (searchKey && apiKey == "areaMeal") {
    console.log(searchKey);
    api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchKey}`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson.meals.slice(0, 25));
    displayMeals(dataJson.meals.slice(0, 25));
  } else if (searchKey && apiKey == "ingrediantsMeal") {
    console.log(searchKey);
    // www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
    api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchKey}`;
    let data = await fetch(api);
    let dataJson = await data.json();
    console.log(dataJson);
    displayMeals(dataJson.meals.slice(0, 25));
  }
}
// Fetch Details Data
async function fetchDetails(id) {
  let api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  let data = await fetch(api);
  let dataJson = await data.json();
  console.log(dataJson.meals);
  displayDetails(dataJson.meals[0]);
}
// Displays
function displayMeals(data) {
  data = data.slice(0, 20);
  box = ``;
  //   console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    box += `
                <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                    <div data-id="${data[i].idMeal}" class="item">
                        <img class="w-100 data-image" src='${data[i].strMealThumb}' alt="">
                         <div class="img-layer">
                            <h2>${data[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            `;
  }
  document.getElementById("mainData").innerHTML = box;

  let items = Array.from(document.querySelectorAll(".item"));
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      console.log(items[i].getAttribute("data-id"));
      fetchDetails(items[i].getAttribute("data-id"));
    });
  }
}
function displayCategories(data) {
  data = data.slice(0, 20);
  box = ``;
  // console.log(data.length);
  // console.log(data[2].strCategoryDescription.split(' ').slice(0,20));
  for (let i = 0; i < data.length; i++) {
    box += `
                  <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                      <div data-id="${data[i].strCategory}" class="item">
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
  let items = Array.from(document.querySelectorAll(".item"));
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      console.log(items[i].getAttribute("data-id"));
      fetchData(items[i].getAttribute("data-id"), "categorymeals");
    });
  }
}
function displayIngredients(data) {
  box = ``;
  // console.log(data.length);
  // console.log(data[2].strCategoryDescription.split(' ').slice(0,20));
  for (let i = 0; i < data.length; i++) {
    box += `
                  <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                      <div data-id="${
                        data[i].strIngredient
                      }" class="item ingred">
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

  let items = Array.from(document.querySelectorAll(".item"));
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      console.log(items[i].getAttribute("data-id"));
      fetchData(items[i].getAttribute("data-id"), "ingrediantsMeal");
    });
  }
}
function displayAreas(data) {
  box = ``;
  // console.log(data.length);
  // console.log(data[2].strCategoryDescription.split(' ').slice(0,20));
  for (let i = 0; i < data.length; i++) {
    box += `
                    <div class="col-12 col-sm-12 col-md-6 col-lg-3 p-2">
                        <div data-id="${data[i].strArea}" class="item ingred">
                            <i class="fa-solid fa-chart-area" style="color: #B197FC;"></i>
                                <h2>${data[i].strArea}</h2>
                            
                        </div>
                    </div>
                `;
  }
  document.getElementById("mainData").innerHTML = box;
  let items = Array.from(document.querySelectorAll(".item"));
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      console.log(items[i].getAttribute("data-id"));
      fetchData(items[i].getAttribute("data-id"), "areaMeal");
    });
  }
}
function displayDetails(data) {
  document.getElementById("mealDetails").classList.remove("d-none");
  document.getElementById("homeSection").classList.add("d-none");

  let box = ``;
  let tags = [];
  let strMeasures = [];
  // datastrIngredient = [];

  for (let i = 0; i <= 19; i++) {
    if (
      data[`strIngredient${i}`] &&
      data[`strIngredient${i}`] != undefined &&
      data[`strMeasure${i}`] &&
      data[`strMeasure${i}`] != undefined
    ) {
      // console.log(data[`strIngredient${i}`]);
      tags.push(data[`strIngredient${i}`]);
      strMeasures.push(data[`strMeasure${i}`]);
    }
  }
  let allTags = tags.toString();
  let strMeasure = strMeasures.toString();
  // console.log(allTags);

  // for (let y = 0; y <= 19; y++) {
  //   datastrIngredient[y] = `strIngredient${y + 1}`;
  // }
  // strIngredient1
  // strIngredient1
  // console.log(datastrIngredient);
  // data.datastrIngredient[0]
  // for (let o = 0 ; o < datastrIngredient.length ; o++) {
  //   ingrediant = datastrIngredient[o];
  //   // console.log(ingrediant);
  //   console.log(data.ingrediant);
  //   // if (data.ingrediant) {
  //   //   tags.push(ingrediant);
  //   //   console.log(tags);
  //   // }
  // }
  box += `
    <div class="col-12 col-sm-12 col-md-6 col-lg-3">
                    <div class="mealDeatils-image">
                        <img class="w-100" src="${data.strMealThumb}" alt="">
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-9">
                    <div class="mealDeatils-desc">
                        <h2>Instructions</h2>
                        <p>${data.strInstructions}</p>
                        <h2>Area : <span>${data.strArea}</span></h2>
                        <h2>Category : <span>${data.strCategory}</span></h2>
                        <h2>Recipes :</h2>
                        <ul class="list-unstyled">
                            <li class="alert alert-danger my-2 p-2">${allTags}</li>

                        </ul>
                        <h2>Tags :</h2>
                        <p class="alert alert-info my-2 p-2">
                        ${strMeasure}
                        </p>
                        <div class="details-buttons">
                            <button class="btn btn-outline-danger"><a href="${data.strYoutube}" target="_blank">Youtube</a></button>
                            <button class="btn btn-outline-success"><a href="${data.strSource}" target="_blank">Source</a></button>
                        </div>
                    </div>
                </div>
  `;
  document.getElementById("mealDetail").innerHTML = box;
}

fetchData("", "home");
