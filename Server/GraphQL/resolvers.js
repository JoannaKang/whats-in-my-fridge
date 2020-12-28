const fetch = require('node-fetch');

let AllRecipes = [];
let AllIngredients = [];

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

  return AllRecipes; 
}

async function fetchIngredientsList() {
  await fetchRecipe();
  const strIngredient = 'strIngredient'
  const properties = Object.keys(AllRecipes[0]);

  for (let j = 0; j < AllRecipes.length; j++) {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].includes(strIngredient)) {
        AllIngredients.push((AllRecipes[j][properties[i]]));
      }
    }
  }


  AllIngredients = AllIngredients.filter(el => el !== "").filter(el => el !== null);
  AllIngredients = AllIngredients.map(el => el.toLowerCase());
  AllIngredients = AllIngredients.filter((item, index) => AllIngredients.indexOf(item) === index);
  console.log('inIngredeintlist', AllIngredients)
  return AllIngredients;
}

const resolvers = {
  Query: {
    getIngredients: () => fetchIngredientsList(),
    getRecipes: () => fetchRecipe()
  }
}

module.exports = resolvers;