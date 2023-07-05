const Dog = require("../models/dogModel");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

// multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.render("home", { dogs: dogs });
  } catch (error) {
    console.log(error);
  }
};

const uploadPage = (req, res) => {
  res.render("upload");
};

const createDog = async (req, res) => {
  try {
    const dog = new Dog({
      name: req.body.name,
      age: req.body.age,
      favoriteFood: req.body.favoriteFood,
      funFact: req.body.funFact,
      image: req.file.filename, //multer places the file info into req.file
    });

    await dog.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllDogs,
  createDog,
  upload,
  uploadPage,
};
