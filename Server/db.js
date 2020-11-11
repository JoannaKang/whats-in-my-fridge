const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/whatsinmyfridge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = db;

