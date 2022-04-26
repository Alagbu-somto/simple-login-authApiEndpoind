//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const cors = require("cors");
const controllers = require("./controller/controllers");

const app = express();
app.use(cors());

app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect("mongodb://localhost:27017/LoginDB");

mongoose.connect(
  "mongodb+srv://Stephen:Testing@cluster0.m8xs9.mongodb.net/ListDB"
);

app.get("/logout", function (req, res) {
  req.logout;
  res.redirect("/");
});

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", controllers.register_post);
app.post("/login", controllers.login_post);
app.post("/forgotpassword", controllers.forgetpssword_post);

app.listen(5000, () => {
  console.log("server is running at port 50000");
});
