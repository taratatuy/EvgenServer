const jwt = require('jsonwebtoken');
const { secret } = require('../../config').jwt;

// tokens validation
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided!' });
  }

  try {
    const payload = jwt.verify(authHeader, secret);
    if (payload.type !== 'access') {
      return res.status(401).json({ message: 'Invalid token!' });
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expired!' });
    }
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token!' });
    }
  }

  next();
};
