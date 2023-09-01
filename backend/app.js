const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const initializePassport = require('./utils/passportConfig');
initializePassport(passport);

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://instockapp.netlify.app'],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

mongoose.connect(config.MONGODB_URI).catch((err) => console.log(err));

app.use('/user', require('./routes/user'));

app.use(passport.authenticate('jwt', { session: false }));

app.use('/product', require('./routes/product'));
app.use('/category', require('./routes/category'));

app.use(require('./middleware/error'));

module.exports = app;
