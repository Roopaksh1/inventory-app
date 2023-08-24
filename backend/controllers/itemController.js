const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item')

exports.getProducts = asyncHandler(async (req, res) => {
  const allProducts = await Item.find({}).populate("category", "name").exec();
  res.json(allProducts);
})

exports.addProduct = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED");
})

exports.updateProduct = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED");
})

exports.deleteProduct = asyncHandler(async (req, res) => {
  await Item.findByIdAndRemove(req.params.id).exec();
  const allProducts = await Item.find({}).populate("category").exec();
  res.json(allProducts);
})