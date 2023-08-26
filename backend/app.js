const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://instockapp.netlify.app'],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(config.MONGODB_URI).catch((err) => console.log(err));

app.use('/product', require('./routes/product'));
app.use('/category', require('./routes/category'));

app.use(require('./middleware/error'));

module.exports = app;
