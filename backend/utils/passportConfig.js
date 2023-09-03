const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const asyncHandler = require('express-async-handler');
const { JWT_SECRET } = require('./config');

const initialize = (passport) => {
  const authenticateUser = asyncHandler(async (req, jwt_payload, done) => {
    const user = await User.findById(jwt_payload.sub);
    if (!user) {
      done(null, false);
    } else {
      req.username = jwt_payload.name;
      done(null, true);
    }
  });

  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };

  const option = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET,
    passReqToCallback: true,
  };

  passport.use(new JwtStrategy(option, authenticateUser));
};

module.exports = initialize;
