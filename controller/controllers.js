const Login = require("../model/userShema");
const passport = require("passport");

const login_post = (req, res) => {
  console.log(req.body.username);
  const user = new Login({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      res.json({ status: 400, message: "unsucessful", error: err });
    } else {
      passport.authenticate("local", {
        failureMessage: true,
      })(req, res, () => {
        res.json({ status: 200, message: "sucessful" });
      });
    }
  });
};

const register_post = async (req, res) => {
  await Login.register(
    { username: req.body.email },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.json({ status: 400, message: "unsucessful", error: err });
      } else {
        passport.authenticate("local")(req, res, function () {
          res.json({ status: 200, message: "sucessful" });
        });
      }
    }
  );
};
const forgetpssword_post = (req, res) => {
  const username = req.body.username;

  const newPassword = req.body.password;
  Login.findOne({ username }, (err, founduser) => {
    if (founduser) {
      founduser.setPassword(newPassword, (err, user) => {
        if (err) {
          res.json({ message: "password set unsuceesful" });
        } else {
          founduser.save();
          console.log("successful");
          res.json({ status: 200, message: "sucessful" });
        }
      });
    } else {
      console.log("not found");
      res.json({ status: 200, message: "user not found" });
    }
  });
};
module.exports = {
  login_post,
  register_post,
  forgetpssword_post,
};
