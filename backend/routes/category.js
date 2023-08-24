const express = require('express');
const {
  getCategory,
  addCategory,
  deleteCategory,
  getCategoryProduct,
} = require('../controllers/categoryController');
const router = express.Router();

router.get('/', getCategory);
router.post('/add', addCategory);
router.get('/:id', getCategoryProduct);

module.exports = router;
