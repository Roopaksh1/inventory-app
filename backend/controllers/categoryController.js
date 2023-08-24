const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Item = require('../models/item');

exports.getCategory = asyncHandler(async (req, res) => {
  const allCategory = await Category.find({}).exec();
  res.json(allCategory);
});

exports.getCategoryProduct = asyncHandler(async (req, res) => {
  const products = await Item.find({ category: req.params.id });
  res.json(products);
});

exports.addCategory = asyncHandler(async (req, res) => {
  res.send('NOT IMPLEMENTED');
});
