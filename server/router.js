const Authentication = require('./controllers/authentication');

module.exports = function exports(app) {
  app.post('/signup', Authentication.signup);
};
