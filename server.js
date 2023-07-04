require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const dogRoutes = require("./routes/dogRoutes");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", dogRoutes);

// make sure DB is connected before starting server
mongoose.connection.once("open", () => {
  console.log("Connected to DB");

  app.listen(PORT, () => {
    console.log(`Server running, listening on port ${PORT}`);
  });
});
