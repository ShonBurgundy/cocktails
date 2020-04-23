//UI
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CocktailService } from './../src/cocktails';

function displayIngredientList(ingredientArray) {
  let ingredientListDisplay = $("#showIngredientsList");
  let htmlForIngredients = "";
  
  ingredientArray.forEach(function(ingredient) {
    htmlForIngredients += "<li id=" + ingredient.split(" ").join("") + ">" + ingredient + "</li>";
  });
  ingredientListDisplay.html(htmlForIngredients);
}

function displayCocktailList(drinkList) {
  let drinkListDisplay = $("#showDrinksList");
  let htmlForDrinks = "";
  drinkList.forEach(function(drink) {
    htmlForDrinks += "<li id=" + drink.split(" ").join("") + ">" + drink + "</li>";
  });
  drinkListDisplay.html(htmlForDrinks);
}

// function expandIngredientList() {
//   let ingredientListDisplay = $("#expandIngredients");
//   let htmlForIngredients = "";
//   $("ul#showDrinkList").on("click", "li", function() {
//     htmlForIngredients += "<li id=" + this.id.split(" ").join("") + ">" + this.id + "</li>";
  
//   drinkList.forEach(function(drink) {
//     displayIngredientList(drink);
//     // htmlForDrinks += "<li id=" + drink.split(" ").join("") + ">" + drink + "</li>";
//   });
//   ingredientListDisplay.html(htmlForIngredients);
//   });
// }

$(document).ready(function() {
  $("#cocktailSearch").click(function() {
    let drink = $("#cocktailInput").val();
    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailInfo(drink);
    
      if (response.drinks === null) {
        $("#showDrinksList").text("");
        $("#showIngredientsList").text("");
        $("#showErrors").text(`We could not find your drink! Check your spelling?`);
      } else if (response) {
        $("#showDrinksList").text("");
        $("#showErrors").text("");
        let ingredientArray = cocktailService.getIngredientArray(response);
        //Show below in a UL
        displayIngredientList(ingredientArray);
      } else {
        $("#showDrinksList").text("");
        $("#showIngredientsList").text("");
        $("#showErrors").text(`You request could not be processed! Check your API key?`);
      }
    })();
  });

  $("#diversifySearch").click(function() {
    let drink = $("#diversifyInput").val();
    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailInfo(drink);
      if (response.drinks === null) {
        $("#showDrinksList").text("");
        $("#showIngredientsList").text("");
        $("#showErrors").text(`We could not find your drink! Check your spelling?`);
      } else if (response) {
        $("#showErrors").text("");
        $("#showIngredientsList").text("");
        let drinkList = cocktailService.getDrinkList(response);
        displayCocktailList(drinkList);
      } else {
        $("#showDrinksList").text("");
        $("#showIngredientsList").text("");
        $("#showErrors").text(`You request could not be processed! Check your API key?`);
      }
    })();
  });
});