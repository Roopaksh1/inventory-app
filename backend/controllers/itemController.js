const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Category = require('../models/category');

exports.getProducts = asyncHandler(async (req, res) => {
  const totalCategory = await Category.find({}, '_id').exec();
  const allProducts = await Item.find({}).populate('category', 'name').exec();
  res.json({ products: allProducts, totalCategory: totalCategory.length });
});

exports.addProduct = asyncHandler(async (req, res) => {
  console.log(req.body, req.file)
  res.send('NOT IMPLEMENTED');
});

exports.updateProduct = asyncHandler(async (req, res) => {
  res.send('NOT IMPLEMENTED');
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Item.findByIdAndRemove(req.params.id).exec();
  const products = await Item.find({
    category: deletedProduct.category,
  }).exec();
  if (products.length === 0) {
    await Category.findByIdAndRemove(deletedProduct.category).exec();
  }
  const totalCategory = await Category.find({}, '_id').exec();
  const allProducts = await Item.find({}).populate('category').exec();
  res.json({ products: allProducts, totalCategory: totalCategory.length });
});
