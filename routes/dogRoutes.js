const express = require("express");
const dogController = require("../controllers/dogController.js");
const router = express.Router();

router.route("/").get(dogController.getAllDogs);

router
  .route("/upload")
  .get(dogController.uploadPage)
  .post(dogController.upload.single("image"), dogController.createDog);

// router.route("/edit/:id").get(dogController.updateDog);

// router.route("/delete/:id").post(dogController.deleteDog);

module.exports = router;
