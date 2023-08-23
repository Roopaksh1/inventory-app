const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(config.MONGODB_URI).catch((err) => console.log(err));

app.use('/product', require('./routes/product'));

module.exports = app;
