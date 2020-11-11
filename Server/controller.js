const db = require('./db');
const { fetchIngredientsList } = require('./ingredientlist');
const Ingredients = require('./Models/Ingredients');


// fetchIngredientsList().then((res) => res.forEach(async el => { await Ingredients.create({ name: el }) }));


exports.getIngredientfromDB = async (req, res) => {
  try {
    const allIngredients = await Ingredients.find();
    console.log("incotroller", allIngredients.length)
    res.status(200).send(allIngredients);
  } catch (err) {
    res.sendStatus(500);
  }
}
