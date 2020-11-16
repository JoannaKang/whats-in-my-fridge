const router = require('express').Router();
const controller = require('./controller');

//*Fetch API request to Recipe API
router.get('/ingredients', controller.getIngredients);
// router.get('/recipielist', controller.getRecipiesfromAPI);

//*DB Request
router.post('/inmyfridge', controller.saveInmyfridge);
router.get('/inmyfridge', controller.getMyFridgeList);
router.get('/inmyfridge/:id', controller.getOnegetMyFridgeItem)
router.delete('/inmyfridge/:id', controller.deleteMyfridge);

router.post('/shoppinglist', controller.saveShoppingList);
router.get('/shoppinglist', controller.getShoppingList);
router.get('/shoppinglist/:id', controller.getOneShoppingList);
router.delete('/shoppinglist/:id', controller.deleteShoppingList);

router.get('/recipies', controller.getRecipes);
router.get('/recipies/:id', controller.getOneRecipe);

router.get('/myrecipe', controller.getMyRecipe);

// router.post('/myrecipies/:id', controller.saveMyrecipe);
router.post('/recipes', controller.saveMyrecipe);

module.exports = router;