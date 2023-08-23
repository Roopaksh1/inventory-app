const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const data = require('../fakeData.json');

exports.getAllProducts = asyncHandler(async (req, res) => {
  res.json(data);
})