const mongoose = require('mongoose');
const ingredientsSchema = new mongoose.Schema({
  name: String,
  recipes: [String]
});

module.exports = mongoose.model('Ingredient', ingredientsSchema);


