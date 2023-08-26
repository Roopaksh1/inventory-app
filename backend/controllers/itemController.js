const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Category = require('../models/category');
const { dataUri } = require('../middleware/multer');
const cloudinary = require('../utils/cloudinaryConfig');
const path = require('path');

exports.getProducts = asyncHandler(async (req, res) => {
  const totalCategory = await Category.find({}, '_id').exec();
  const allProducts = await Item.find({}).populate('category', 'name').exec();
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

exports.updateProduct = asyncHandler(async (req, res) => {
  res.send('NOT IMPLEMENTED');
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Item.findByIdAndRemove(req.params.id).exec();
  await cloudinary.uploader.destroy(deletedProduct.image.public_id);
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
