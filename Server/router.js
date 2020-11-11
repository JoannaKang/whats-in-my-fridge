const router = require('express').Router();
const controller = require('./controller');

router.get('/ingredients', controller.getIngredientfromDB);

module.exports = router;