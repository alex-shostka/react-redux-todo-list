require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const dataRouter = require('./routes/data');
const authRouter = require("./routes/auth");
const cors = require('cors');

// passport.js
const session = require("express-session");
const passport = require("passport");
const passportSession = require("passport-session");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

mongoose.connect(process.env.CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    function (username, password, done) {
      const passwordHash = sha256(password);
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password != passwordHash) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use('/todos', cors(corsOptions), dataRouter);
app.use("/auth", cors(corsOptions), authRouter);

app.listen(3100, () => {
  console.log("Server started on 3100!");
});
