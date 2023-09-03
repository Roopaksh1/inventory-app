const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Category = require('../models/category');
const { dataUri } = require('../middleware/multer');
const cloudinary = require('../utils/cloudinaryConfig');
const path = require('path');

exports.getProducts = asyncHandler(async (req, res) => {
  const totalCategory = await Category.find(
    { user: req.user._id },
    '_id'
  ).exec();
  const allProducts = await Item.find({ user: req.user._id })
    .populate('category', 'name')
    .exec();
  res.json({ products: allProducts, totalCategory: totalCategory.length });
});

exports.addProduct = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please enter product name.'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Please enter product category.'),
  body('price')
    .trim()
    .escape()
    .isNumeric({ min: 0 })
    .withMessage('Invalid Price.'),
  body('quantity')
    .trim()
    .escape()
    .isNumeric({ min: 0 })
    .withMessage('Invalid Quantity.'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please enter product description.')
    .isLength({ max: 255 })
    .withMessage('Description can have no more than 255 characters.'),

  asyncHandler(async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400);
      throw new Error(error.errors[0].msg);
    }
    if (!req.file) {
      res.status(400);
      throw new Error('Please enter product image.');
    }
    const { name, description, category, price, quantity } = req.body;
    const uploadedFile = await cloudinary.uploader.upload(
      dataUri(req).content,
      {
        public_id:
          new Date().toISOString().replace(/:/g, '-') +
          '-' +
          path.basename(
            req.file.originalname,
            path.extname(req.file.originalname)
          ),
        folder: 'products',
      }
    );
    const fileData = {
      public_id: uploadedFile.public_id,
      url: uploadedFile.secure_url,
    };
    const product = await Item.create({
      user: req.user._id,
      name,
      description,
      category,
      price,
      quantity,
      image: fileData,
    });
    await Item.populate(product, { path: 'category', select: 'name' });
    res.json(product);
  }),
];

exports.updateProduct = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please enter product name.'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Please enter product category.'),
  body('price')
    .trim()
    .escape()
    .isNumeric({ min: 0 })
    .withMessage('Invalid Price.'),
  body('quantity')
    .trim()
    .escape()
    .isNumeric({ min: 0 })
    .withMessage('Invalid Quantity.'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please enter product description.')
    .isLength({ max: 255 })
    .withMessage('Description can have no more than 255 characters.'),
  asyncHandler(async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400);
      throw new Error(error.errors[0].msg);
    }
    const product = await Item.findById(req.params.id).exec();
    if (!product) {
      res.status(400);
      throw new Error('Product not found.');
    }
    const { name, description, category, price, quantity } = req.body;

    // Delete category if it is empty
    let deleted = false;
    if (product.category.toString() !== category) {
      const allProducts = await Item.find(
        {
          category: product.category,
        },
        '_id'
      ).exec();
      if (allProducts.length === 1) {
        await Category.findByIdAndRemove(product.category).exec();
        deleted = true;
      }
    }

    let fileData;
    if (req.file) {
      uploadedFile = await cloudinary.uploader.upload(dataUri(req).content, {
        public_id: product.image.public_id,
      });
      fileData = {
        public_id: uploadedFile.public_id,
        url: uploadedFile.secure_url,
      };
    }
    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.quantity = quantity;
    if (fileData) {
      product.image = fileData;
    }
    const modifiedProduct = await product.save();
    await Item.populate(modifiedProduct, { path: 'category', select: 'name' });
    res.json({ modifiedProduct, flag: deleted });
  }),
];

exports.deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Item.findByIdAndRemove(req.params.id).exec();
  await cloudinary.uploader.destroy(deletedProduct.image.public_id);
  const products = await Item.find({
    category: deletedProduct.category,
  }).exec();
  if (products.length === 0) {
    await Category.findByIdAndRemove(deletedProduct.category).exec();
  }
  const totalCategory = await Category.find(
    { user: req.user._id },
    '_id'
  ).exec();
  const allProducts = await Item.find({
    user: req.user._id,
  })
    .populate('category')
    .exec();
  res.json({ products: allProducts, totalCategory: totalCategory.length });
});
