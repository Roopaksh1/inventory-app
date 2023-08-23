const express = require('express');
const { getAllProducts } = require('../controllers/itemController');
const router = express.Router();

router.get('/', getAllProducts);

module.exports = router;