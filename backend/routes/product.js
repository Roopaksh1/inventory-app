const express = require('express');
const {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} = require('../controllers/itemController');
const router = express.Router();

router.get('/', getProducts);
router.post('/add/', addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
module.exports = router;
