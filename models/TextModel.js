const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const text = new Schema(
  {
    head: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

text.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('TextModel', text);
