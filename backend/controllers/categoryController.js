const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Item = require('../models/item');

exports.getCategory = asyncHandler(async (req, res) => {
  const allCategory = await Category.find({
    user: req.user._id,
  }).exec();
  res.json(allCategory);
});

exports.getCategoryProduct = asyncHandler(async (req, res) => {
  const products = await Item.find({ category: req.params.id });
  res.json(products);
});

exports.addCategory = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please enter category name.'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please enter category description.')
    .isLength({ max: 255 })
    .withMessage('Description can have no more than 255 characters.'),
  asyncHandler(async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400);
      throw new Error(error.errors[0].msg);
    }
    const { name, description } = req.body;
    const category = await Category.create({
      user: req.user._id,
      name,
      description,
    });
    res.json(category);
  }),
];
