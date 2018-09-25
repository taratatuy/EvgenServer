const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const token = new Schema({
  tokenId: String,
  userId: String
});

token.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('TokenModel', token);
