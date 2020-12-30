const db = require('./db');
const {Query} = require('./GraphQL/resolvers');
// const Recipies = require('./Recipies');
const Recipies = require('./Models/Recipies');
const Ingredients = require('./Models/Ingredients');
const MyfridgeItem = require('./Models/Fridgeitem');
const ShoppingListItem = require('./Models/ShoppingListItem');
const MyRecipe = require('./Models/Myrecipe');
const User = require('./Models/User');

exports.getIngredients = async (req, res) => {
  try {
    const allIngredients = await Ingredients.find();
    res.status(200).send(allIngredients);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.saveInmyfridge = async (req, res) => {
  try {
    console.log("In my fridge", req.body);
    const newMyFridgeItem = await MyfridgeItem.create(req.body);
    res.status(201).send(newMyFridgeItem);
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
};

exports.getMyFridgeList = async (req, res) => {
  try {
    const AllFridgeList = await MyfridgeItem.find({});
    console.log(AllFridgeList);
    res.status(200).send(AllFridgeList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getOnegetMyFridgeItem = async (req, res) => {
  try {
    console.log('Find One from My Fridge', req.params.id)
    const foundedItem = await MyfridgeItem.findOne({
      _id: req.params.id
    });
    console.log(foundedItem);
    res.status(200).send(foundedItem);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

exports.deleteMyfridge = async (req, res) => {
  try {
    console.log('Deleted', req.params.id.slice(1,))
    let result = await MyfridgeItem.deleteOne({
      _id: req.params.id.slice(1,)
    })
    res.status(204).send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

exports.saveShoppingList = async (req, res) => {
  try {
    console.log("Shopping list", req.body);
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
    console.log("From ShoppingList collection", AllshoppingList)
    res.send(AllshoppingList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getOneShoppingList = async (req, res) => {
  try {
    console.log('Find One from Shopping list', req.params.id)
    const foundedItem = await ShoppingListItem.findOne({
      _id: req.params.id
    });
    console.log(foundedItem);
    res.status(200).send(foundedItem);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

exports.deleteShoppingList = async (req, res) => {
  try {
    console.log('Deleted', req.params.id.slice(1,))
    let result = await ShoppingListItem.deleteOne({
      _id: req.params.id.slice(1,)
    })
    res.status(204).send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

exports.getRecipes = async (req, res) => {
  try {
    const RecipiesfromDB = await Recipies.find();
    res.status(200).send(RecipiesfromDB);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

exports.getOneRecipe = async (req, res) => {
  console.log('Find one from Recipes')
  try {
    console.log(req.params.id);
    const foundedRecipe = await Recipies.findOne({
      _id: req.params.id
    });
    res.status(200).send(foundedRecipe);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

exports.getMyRecipe = async (req, res) => {
  try {
    const MyRecipiesfromDB = await MyRecipe.find();
    res.status(200).send(MyRecipiesfromDB);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

exports.saveMyrecipe = async (req, res) => {
  try {
    console.log("from client", req.body);
    const newMyrecipeId = await MyRecipe.create(req.body);
    console.log("created", newMyrecipeId);
    res.status(201).send(newMyrecipeId);
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
}

exports.createUser = async (req, res) => {
  try {
    console.log('🧚‍♀️req.body', req.body);
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch(e) {
    console.log('error', e);
    res.sendStatus(500);
  }
}

exports.createShoppinglistItem = async (req, res) => {
  try {
    console.log('🤡req.body', req.body);
    // const user = await User.create(req.body);
    // res.status(201).send(user);
  } catch(e) {
    console.log('error', e);
    res.sendStatus(500);
  }
}

async function ingredientrecipeMapping() {
  try {
    let res = await db;
    try {
      await res.connection.dropCollection("ingredients")
    }
    catch (err) {
      console.log('Tried to drop ingredients db but it failed.');
    }
 
    let ingredient_res = await Query.getIngredients();

    for (let i = 0; i < ingredient_res.length; i++) {
      await Ingredients.create({ name: ingredient_res[i] })
    }


    console.log('Recipe List Start!');
    const ingredientslist = await Ingredients.find();
    const recipelist = await Recipies.find();

    for (let i = 0; i < ingredientslist.length; i++) {
      for (let j = 0; j < recipelist.length; j++) {
        for (let k = 1; k <= 20; k++) {
          const ingredient = recipelist[j][`strIngredient${k}`]
          if (ingredient === undefined || ingredient === null) { break };
          if (ingredientslist[i].name === ingredient.toLowerCase()) {
            await Ingredients.findOneAndUpdate({ _id: ingredientslist[i]._id }, { $addToSet: { recipes: [recipelist[j]._id] } })
            // .then(res => console.log(res));
          }
        }
      }
    }
    console.log('Ingredient list loaded')
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
// ingredientrecipeMapping();