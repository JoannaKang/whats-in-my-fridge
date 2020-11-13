const router = require('express').Router();
const controller = require('./controller');

router.get('/ingredients', controller.getIngredients);
router.post('/inmyfridge', controller.saveInmyfridge);
router.get('/inmyfridge', controller.getMyFridgeList);
router.get('/inmyfridge/:id', controller.getOnegetMyFridgeItem)
router.delete('/inmyfridge/:id', controller.deleteMyfridge);



router.post('/shoppinglist', controller.saveShoppingList);
router.get('/shoppinglist', controller.getShoppingList);

module.exports = router;