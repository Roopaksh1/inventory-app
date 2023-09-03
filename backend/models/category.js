const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
