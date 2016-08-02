const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user model
const userSchema = new Schema({
  email: { type: 'string', unique: true, lowercase: true },
  password: 'string',
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
