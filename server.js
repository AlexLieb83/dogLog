require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const dogRoutes = require("./routes/dogRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");

const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass curr user info to all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", dogRoutes);
app.use("/", userRoutes);

// make sure DB is connected before starting server
mongoose.connection.once("open", () => {
  console.log("Connected to DB");

  app.listen(PORT, () => {
    console.log(`Server running, listening on port ${PORT}`);
  });
});
