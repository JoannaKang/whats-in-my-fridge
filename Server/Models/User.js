const mongoose = require('mongoose');

const Item = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number },
    date: { type: Date, default: Date.now, required: true },
    saved: { type: String, required: true }
});

const myrecipeSchema = new mongoose.Schema({
  recipeID: { type: String, required: true }
});

const User = new mongoose.Schema({
  shoppinglistitem: [Item],
  fridgeitem: [Item],
  myrecipe: [myrecipeSchema]
})

module.exports = mongoose.model('User', User);