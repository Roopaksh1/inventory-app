const express = require('express');
const {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} = require('../controllers/itemController');
const router = express.Router();
const { upload } = require('../middlewares/multer');

router.get('/', getProducts);
router.post('/add', upload.single('image'), addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
module.exports = router;
