const fetch = require('node-fetch');
const Recipies = require('./Models/Recipies')

let AllRecipes = [];


async function fetchRecipe() {
  const Alphabets = 'abcdefghigklmnopqrstuvwxyz'
  let mealsbyAlphabet = [];
  let res = [];

  for (let i = 0; i < Alphabets.length; i++) {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Alphabets[i]}`)
    const apiResponse = await res.json()
    mealsbyAlphabet.push(apiResponse);
  }

  AllRecipes = mealsbyAlphabet
    .flatMap(el => el.meals)
    .filter(el => el !== null);

  AllRecipes.forEach(async (el) => {
    console.log(el);
    await Recipies.create({
      idMeal: el.idMeal,
      strMeal: el.strMeal,
      strCategory: el.strCategory,
      strArea: el.strArea,
      strInstructions: el.strInstructions,
      strMealThumb: el.strMealThumb,
      strIngredient1: el.strIngredient1,
      strIngredient2: el.strIngredient2,
      strIngredient3: el.strIngredient3,
      strIngredient4: el.strIngredient4,
      strIngredient5: el.strIngredient5,
      strIngredient6: el.strIngredient6,
      strIngredient7: el.strIngredient7,
      strIngredient8: el.strIngredient8,
      strIngredient9: el.strIngredient9,
      strIngredient10: el.strIngredient10,
      strIngredient11: el.strIngredient11,
      strIngredient12: el.strIngredient12,
      strIngredient13: el.strIngredient13,
      strIngredient14: el.strIngredient14,
      strIngredient15: el.strIngredient15,
      strIngredient16: el.strIngredient16,
      strIngredient17: el.strIngredient17,
      strIngredient18: el.strIngredient18,
      strIngredient19: el.strIngredient19,
      strIngredient20: el.strIngredient20,
      strMeasure1: el.strMeasure1,
      strMeasure2: el.strMeasure2,
      strMeasure3: el.strMeasure3,
      strMeasure4: el.strMeasure4,
      strMeasure5: el.strMeasure5,
      strMeasure6: el.strMeasure6,
      strMeasure7: el.strMeasure7,
      strMeasure8: el.strMeasure8,
      strMeasure9: el.strMeasure9,
      strMeasure10: el.strMeasure10,
      strMeasure11: el.strMeasure11,
      strMeasure12: el.strMeasure12,
      strMeasure13: el.strMeasure13,
      strMeasure14: el.strMeasure14,
      strMeasure15: el.strMeasure15,
      strMeasure16: el.strMeasure16,
      strMeasure17: el.strMeasure17,
      strMeasure18: el.strMeasure18,
      strMeasure19: el.strMeasure19,
      strMeasure20: el.strMeasure20,
    })
  })

}

module.exports = fetchRecipe;