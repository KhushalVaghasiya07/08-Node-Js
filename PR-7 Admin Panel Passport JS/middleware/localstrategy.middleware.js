const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user.models");

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async function (email, password, done) {
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: "No user found" });
    } else {
      if (password == user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Wrong password" });
      }
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    if (user) {
      done(null, user);
    }
  } catch (err) {
    done(err);
  }
});

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/");
  }
}

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;