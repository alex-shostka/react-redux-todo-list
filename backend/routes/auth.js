const express = require("express");
const router = express.Router();
const User = require('../models/user');
const sha256 = require("sha256");

router.post("/signup", async function (req, res, next) {
  try {
    const { username, password } = req.body; // ???
    const passwordHash = sha256(password);
    const getNewUser = await User.findOne({ username: username });
    if (getNewUser) {
      return res.status(400).json({ message: "Пользователь с таким именем уже существует!" });
    }
    const newUser = new User({ username, password: passwordHash });
    await newUser.save();
    res.json({ success: true});
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.post('/login', async (req, res) => {
  const { body: { username, password } } = req;
  const user = await User.findOne({ username });
  if (user) {
    if (user.password === sha256(password)) {
      req.login(user, (err) => {
        if (err) console.log('ERRROR!!!');
        return res.json({ successAuth: true });
      });
    } else {
      res.json({ incorrectPass: true });
    }
  } else {
    res.json({ incorrectUsername: true });
  }
});

router.get('/user', authenticationMiddleware(), async (req, res, next) => {
  const user = req.user;
  res.json({ user });
});

router.post("/logout", function (req, res, next) {
  try {
    req.logout();
    res.json({ deauth: true });
  } catch (err) {
    console.log(err);
  }
});

function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({ auth: false });
  };
}

module.exports = router;
