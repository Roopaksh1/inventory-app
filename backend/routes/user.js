const express = require('express');
const {
  postSignUp,
  postLogIn,
  getLogOut,
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

module.exports = router;
