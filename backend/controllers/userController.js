const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/jwtConfig');

exports.postSignUp = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please add an username.')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the username'),
  body('email').trim().isEmail().withMessage('Please add an email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password Required')
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
    .withMessage(
      'One uppercase, One lowercase and a number. Spaces are not allowed.'
    ),
  asyncHandler(async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400);
      throw new Error(error.errors[0].msg);
    }
    const name = req.body.name;
    // Check for existing user
    if ((await User.find({ name: name.toLowerCase() })).length === 1) {
      res.status(401);
      throw new Error('A user with that username already exists');
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;
    const user = await User.create({
      name,
      password,
      email,
    });
    const token = generateToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'none',
      secure: true,
    }); // 1 day
    res.json({ auth: true, name: user.name });
  }),
];

exports.postLogIn = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const user = await User.findOne({ name: name.toLowerCase() });
  if (!user) {
    res.status(401);
    throw new Error('Invalid Username.');
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Invalid Password.');
  }
  const token = generateToken(user);
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'none',
    secure: true,
  }); // 1 day
  res.json({ auth: true, name: user.name });
});

exports.getLogOut = (req, res) => {
  if (req.cookies['jwt']) {
    res.clearCookie('jwt').json('You have logged out.');
  }
};

// auth status
exports.getLoggedIn = (req, res) => {
  res.json({ auth: req.isAuthenticated(), name: req.user.name });
};
