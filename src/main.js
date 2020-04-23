//UI
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CocktailService } from './../src/cocktails';

function displayIngredientList(ingredientArray) {
  let ingredientListDisplay = $("#showDrinksList");
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

$(document).ready(function() {
  $("#cocktailSearch").click(function() {
    let drink = $("#cocktailInput").val();
    (async () => {
      let cocktailService = new CocktailService();
      const response = await cocktailService.getCocktailInfo(drink);
    
      if (response.drinks === null) {
        $("#showErrors").text(`We could not find your drink! Check your spelling?`);
      } else if (response) {
        $("#showErrors").text("");
        let ingredientArray = cocktailService.getIngredientArray(response);
        //Show below in a UL
        displayIngredientList(ingredientArray);
        // $(".showIngredients").text(`The ingredients for a ${drink} are ${ingredientArray}`);
      } else {
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
        $("#showErrors").text(`We could not find your drink! Check your spelling?`);
      } else if (response) {
        $("#showErrors").text("");
        let drinkList = cocktailService.getDrinkList(response);
        displayCocktailList(drinkList);
        // $(".showIngredients").text(`Drink Ideas: ${drinkList}`);
      } else {
        $("#showErrors").text(`You request could not be processed! Check your API key?`);
      }
    })();
  });
});