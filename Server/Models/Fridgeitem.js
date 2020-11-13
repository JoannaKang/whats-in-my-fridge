const mongoose = require('mongoose');

const myfridgeitemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number },
  date: { type: Date, default: Date.now, required: true },
  saved: { type: String, required: true }
})

module.exports = mongoose.model('Myfridgeitem', myfridgeitemSchema);