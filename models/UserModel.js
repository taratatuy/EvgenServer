const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
  {
    login: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

user.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('UserModel', user);
