const express = require('express');
const {
  postSignUp,
  postLogIn,
  getLogOut,
  getLoggedIn,
} = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');

router.post('/sign-up', postSignUp);
router.post('/log-in', postLogIn);
router.get(
  '/log-out',
  passport.authenticate('jwt', { session: false }),
  getLogOut
);
router.get(
  '/logged-in',
  passport.authenticate('jwt', { session: false }),
  getLoggedIn
);

module.exports = router;
