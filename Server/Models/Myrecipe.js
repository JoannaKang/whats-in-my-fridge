const mongoose = require('mongoose');
const myrecipeSchema = new mongoose.Schema({
  recipeID: { type: String, required: true }
});

module.exports = mongoose.model('MyRecipe', myrecipeSchema);

