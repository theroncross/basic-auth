/* eslint-disable */

const User = require('../models/user');

exports.signup = function (req, res, next) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // see if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email already exists' });
    }

    const user = new User({
      email: email,
      password: password
    });

    // if email does not exist, save user to db
    user.save(function (err) {
      if (err) { return next(err); }

      // respond to request indicating successful creation
      res.json({ success: true });
    });
  });
};
