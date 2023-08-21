const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./utils/config');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(config.MONGODB_URI).catch((err) => console.log(err));

module.exports = app;
