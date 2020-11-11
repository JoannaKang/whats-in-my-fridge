const mongoose = require('mongoose');
const ingredientsSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Ingredient', ingredientsSchema);

