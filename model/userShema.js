const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const Login = mongoose.model("Login", userSchema);
passport.use(Login.createStrategy());
passport.serializeUser(Login.serializeUser());

passport.deserializeUser(Login.deserializeUser());

module.exports = Login;
