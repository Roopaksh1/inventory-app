const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

module.exports = mongoose.model('User', UserSchema);
