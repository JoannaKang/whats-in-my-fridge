const router = require('express').Router();
const controller = require('./controller');

router.get('/ingredients', controller.getIngredients);
router.post('/inmyfridge', controller.saveInmyfridge);
router.get('/inmyfridge', controller.getMyFridgeList);
router.post('/shoppinglist', controller.saveShoppingList);
router.get('/shoppinglist', controller.getShoppingList);

module.exports = router;