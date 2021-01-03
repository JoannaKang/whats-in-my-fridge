const MyfridgeItem = require('../../Models/Fridgeitem');
const ShoppingListItem = require('../../Models/ShoppingListItem');
const MyRecipeItem = require('../../Models/Myrecipe');
const Recipies = require('../../Models/Recipies');

exports.getMyFridgeList = async () => {
  try {
    const AllFridgeList = await MyfridgeItem.find({});
    console.log(AllFridgeList);
    return AllFridgeList;
  } catch (e) {
    console.log(e);
  }
};

exports.getShoppingList = async () => {
  try {
    const AllshoppingList = await ShoppingListItem.find({});
    console.log("From ShoppingList collection", AllshoppingList)
    return AllshoppingList;
  } catch (e) {
    console.log(e);
  }
};

exports.getOneMyFridgeItem = async (id) => {
  try {
    console.log('Find One from My Fridge', id)
    const foundedItem = await MyfridgeItem.findOne({
      _id: id
    });
    return foundedItem;
  } catch (e) {
    console.log(e);
  }
}

exports.getOneShoppingList = async (id) => {
  try {
    console.log('❤️❤️❤️❤️❤️Find One from Shopping list', id)
    const foundedItem = await ShoppingListItem.findOne({
      _id: id
    });
    console.log(foundedItem);
    return foundedItem
  } catch (e) {
    console.log(e);
  }
}

exports.getMyRecipeItems = async () => {
  try {
    const allRecipeList = await MyRecipeItem.find({})
    console.log('allRecipeList', allRecipeList);
    return allRecipeList;
    
  } catch (error) {
    console.log(error);
    
  }
}

exports.getOneRecipe = async (id) => {
  console.log('Find one from Recipes')
  try {
    console.log(id);
    const foundedRecipe = await Recipies.findOne({
      _id: id
    });
    return foundedRecipe;
  } catch (err) {
    console.log(err);
  }
}

exports.getFullRecipe = async () => {
  try {
    const allRecipeList = await MyRecipeItem.find({});
    const fullRecipes = []
    for (let i = 0; i < allRecipeList.length; i++) {
      const foundedRecipe = await Recipies.findOne({
        _id: allRecipeList[i].recipeID
      });
      fullRecipes.push(foundedRecipe);
    }
    console.log('fullRecipes', fullRecipes);
    return fullRecipes;
    
  } catch (error) {
    console.log('error', error);    
  }
}