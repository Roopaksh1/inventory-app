const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const generateToken = (user) => {
  const payload = {
    sub: user._id,
    name: user.name,
    iat: Date.now(),
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

module.exports = generateToken;
