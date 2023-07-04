const Dog = require("../models/dogModel");

const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.render("home", { dogs: dogs });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllDogs,
};
