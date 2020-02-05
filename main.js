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
        console.log(data);
        result_heading.innerHTML = `<h2>Search results for ${search_input}</h2>`;
      });
  } else {
    alert("Please enter something fool");
  }
}

// event listeners

form.addEventListener("submit", searchRecipes);
