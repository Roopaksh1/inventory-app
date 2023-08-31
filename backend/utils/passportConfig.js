const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const asyncHandler = require('express-async-handler');
const { JWT_SECRET } = require('./config');

const initialize = (passport) => {
  const authenticateUser = asyncHandler(async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload.sub);
    if (!user) {
      done(null, false);
    } else {
      done(null, true);
    }
  });

  const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: JWT_SECRET,
  };

  passport.use(new JwtStrategy(option, authenticateUser));
};

module.exports = initialize;
