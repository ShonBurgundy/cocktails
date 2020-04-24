import $ from 'jquery';

export class CocktailService {
  
  async getCocktailInfo(drink) {
    try {
      let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/search.php?s=${drink}`);
      let jsonifiedResponse;
      if (response.ok && response.status === 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch(error) {
      return false;
    }
  }

  getIngredientsFromDrink (drinkArray) {
    let ingredients = [];
    $.each(drinkArray, function(key,value){
      if (key.startsWith("strIngredient") && value) {
        ingredients.push(value);
      }
    });
    return ingredients;
  }

  getDrinkList (response) {
    let drinkList = [];
    for (let i = 0; i <= (response.drinks.length - 1); i++){ 
      drinkList.push(response.drinks[i].strDrink);
    }
    return drinkList;
  }
  
  getIngredientArray(response) {
    if (response) {
      //We should get the name of all the drinks and let user pick which drink they would like to see ingredients for via for loop?
      let drinkArray = response.drinks[0];
      let ingredients = this.getIngredientsFromDrink(drinkArray);
      return ingredients;
    }
  }
}


export class RandomCocktailService {
  async getRandomCocktailInfo() {
    try {
      let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/${process.env.API_KEY}/random.php`);
      let jsonifiedResponse;
      if (response.ok && response.status === 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch(error) {
      return false;
    }
  }

  getRandomDrink (response) {
    let drink = response.drinks[0].strDrink;
    return drink;
  }

  getIngredientsFromDrink (drinkArray) {
    let ingredients = [];
    $.each(drinkArray, function(key,value){
      if (key.startsWith("strIngredient") && value) {
        ingredients.push(value);
      }
    });
    return ingredients;
  }

  getRandomIngredientArray(response) {
    if (response) {
      let drinkArray = response.drinks[0];
      let ingredients = this.getIngredientsFromDrink(drinkArray);
      return ingredients;
    }
  }
}

export class GiphyService {
  async giphyCall(drink) {
    try {
      let response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY_GIPHY}&q=${drink}`);
      let jsonifiedResponse;
      if (response.ok && response.status === 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch(error) {
      return false;
    } 
  }
  getGif(gifResponse) {
    if (gifResponse) {
      let gifUrl = gifResponse.data[0].images.downsized_large.url;
      return gifUrl;
    }
  }
}

