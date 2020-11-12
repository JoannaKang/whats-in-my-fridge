const db = require('./db');
const { fetchIngredientsList } = require('./ingredientlist');
const Ingredients = require('./Models/Ingredients');
const MyfridgeItem = require('./Models/Fridgeitem');
const ShoppingListItem = require('./Models/ShoppingListItem');


// fetchIngredientsList().then((res) => res.forEach(async el => { await Ingredients.create({ name: el }) }));


exports.getIngredients = async (req, res) => {
  try {
    const allIngredients = await Ingredients.find();
    console.log("incotroller", allIngredients.length)
    res.status(200).send(allIngredients);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.saveInmyfridge = async (req, res) => {
  try {
    console.log(req.body);
    const { name, category, quantity } = await req.body;
    const newMyFridgeItem = MyfridgeItem.create({ name, category, quantity });
    res.status(201).send(newMyFridgeItem);
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
};

exports.getMyFridgeList = async (req, res) => {
  try {
    const AllFridgeList = await MyfridgeItem.find({});
    res.send(AllFridgeList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.saveShoppingList = async (req, res) => {
  try {
    const newMyShoppingList = await ShoppingListItem.create(req.body);
    res.status(201).send(newMyShoppingList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getShoppingList = async (req, res) => {
  try {
    const AllshoppingList = await ShoppingListItem.find({});
    res.send(AllshoppingList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

