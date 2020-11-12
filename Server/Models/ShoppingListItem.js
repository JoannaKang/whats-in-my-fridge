const mongoose = require('mongoose');

const shoppingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number },
  date: { type: Date, default: Date.now, required: true }
})

module.exports = mongoose.model('ShoppingListitem', shoppingItemSchema);