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
    const dogs = await Dog.find().populate("owner");
    res.render("home", { dogs: dogs, user: req.user });
  } catch (error) {
    console.log(error);
  }
};

const uploadPage = (req, res) => {
  res.render("upload", { user: req.user });
};

const createDog = async (req, res) => {
  try {
    const dog = new Dog({
      name: req.body.name,
      age: req.body.age,
      favoriteFood: req.body.favoriteFood,
      funFact: req.body.funFact,
      image: req.file.filename, //multer places the file info into req.file
      owner: req.user._id,
    });

    await dog.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const editPage = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    res.render("edit", { dog: dog, user: req.user });
  } catch (error) {
    console.log(error);
  }
};

const updateDog = async (req, res) => {
  try {
    let dog = await Dog.findById(req.params.id);
    if (dog.owner.equals(req.user._id)) {
      await Dog.findByIdAndUpdate(req.params.id, req.body);
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteDog = async (req, res) => {
  try {
    let dog = await Dog.findById(req.params.id);
    if (dog.owner.equals(req.user._id)) {
      findByIdAndRemove(req.params.id);
    }
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
  editPage,
  updateDog,
  deleteDog,
};
