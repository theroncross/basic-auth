/* eslint-disable */

const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

// Supply already authed user with a token
exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

// Authorize user and respond with token
exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Please provide both an email and password.' });
  }

  // see if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'That email is already in use.' });
    }

    const user = new User({
      email: email,
      password: password
    });

    // if email does not exist, save user to db
    user.save(function (err) {
      if (err) { return next(err); }

      // respond to with auth token
      res.json({ token: tokenForUser(user) });
    });
  });
};
