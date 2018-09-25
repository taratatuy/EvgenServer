const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const { tokens, secret } = require('./config').jwt;
const models = require('./models');

const generateAccessToken = userId => {
  const payload = {
    userId,
    type: tokens.access.type
  };
  const options = { expiresIn: tokens.access.expiresIn };

  return (accessToken = jwt.sign(payload, secret, options));
};

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type
  };
  const options = { expiresIn: tokens.refresh.expiresIn };

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options)
  };
};

const replaceDbRefreshToken = (tokenId, userId) =>
  models.TokenModel.findOneAndRemove({ userId })
    .exec()
    .then(() => {
      models.TokenModel.create({ tokenId, userId });
      console.log('UPDATE_TOKENS: TRUE');
    });

const updateTokens = userId => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();

  return replaceDbRefreshToken(refreshToken.id, userId).then(() => ({
    accessToken,
    refreshToken: refreshToken.token
  }));
};

const refreshTokens = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== 'refresh') {
      return res.status(400).json({ message: 'Invalid token!' });
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expired!' });
    } else if (e instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token!' });
    }
  }

  models.TokenModel.findOne({ tokenId: payload.id })
    .exec()
    .then(token => {
      if (token === null) {
        throw new Error('Invalid token!');
      }
      return updateTokens(token.userId);
    })
    .then(tokens => {
      res.json(tokens);
      console.log('REFRESH_TOKENS: TRUE');
    })
    .catch(err => res.status(400));
};

module.exports = {
  updateTokens,
  refreshTokens
};
