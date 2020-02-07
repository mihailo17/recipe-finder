const form = document.getElementById("form");
const search = document.getElementById("search");
const submit = document.getElementById("search-submit");
const random = document.getElementById("random");
const recipes = document.getElementById("recipes");
const one_recipe = document.getElementById("one-recipe");
const result_heading = document.getElementById("result-heading");

// Search recipes and fetch

function searchRecipes(e) {
  e.preventDefault();
  
  //   clear single meal
  
  one_recipe.innerHTML = "";
  
  //get the search input
  
  const search_input = search.value;
  
  // check for empty input
  
  if (search_input.trim()) {
    
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_input}`
    )
     .then(response => response.json())
     .then(data => {

        result_heading.innerHTML = `<h2>Search results for ${search_input}</h2>`;
  
        if(data.meals === null){
          result_heading.innerHTML = `<p>Nothing found for ${search_input}</p>`
        }
    
        else{
    
          //Using high order array function => map() to loop through all the meals
    
          recipes.innerHTML = data.meals.map(meal=>
            `<div class="recipe z-depth-4">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="recipe-info" data-meal-id="${meal.idMeal}"> 
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`).join('')//added this so it displays as a string
        }
      });
      
  } else {
    alert("Please enter something fool");
  }
}
//Fetch recipes by ID
function getMealByID(mealID){
  fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then (response => response.json())
  .then (data => {
    const meal = data.meals[0];
    addMealToDOM(meal);
  })
}
//add meal to dom
function addMealToDOM(meal){
  const ingredients = [];
  /*
  in api response data ingredients and measures are not linked in value pairs so I need to create an
  array where they are so I can use it more easily
  Im looping through a meal and searching for ingredients and measures that have the same index number and pushing them to an array   
  */
  
  for(let i = 1; i<=20; i++){
    
    if(meal[`strIngredient${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]}- ${meal[`strMeasure${i}`]}`);
    }
    
    else{
      break;
    }
  }
  one_recipe.innerHTML = `
    <h2 class="one-recipe-title">${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt = "${meal.strMeal}"/>
    <p class= "single-recipe-info">Meal category: ${meal.strCategory}</p>
    <p class= "single-recipe-info">Arrea: ${meal.strArea}</p>
    <p class = "instructions">${meal.strInstructions}</p>
    <h3>Ingredients: </h3>
    
    <ul>
      ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>
  
    `;
}
// event listeners

form.addEventListener("submit", searchRecipes);

recipes.addEventListener('click', e => {
  const recipeInfo = e.path.find(element=>{
    // searching through DOM for an element user clicked on and returning an element which has class of recipe-info
    
    if(element.classList){

      return element.classList.contains('recipe-info');

    } 

    else{

      return false;

    }

  })
  // if such element exists, i need its data-attribute which I set above based on info I got from api data
  if(recipeInfo){

    const mealID = recipeInfo.getAttribute('data-meal-id');

    getMealByID(mealID);
    window.location.href = "#one-recipe"


  }

})

// TODO: random meal functionality