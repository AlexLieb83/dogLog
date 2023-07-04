const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFood: String,
  funFact: String,
  image: String,
});

module.exports = mongoose.model("Dog", dogSchema);
