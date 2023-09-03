const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
