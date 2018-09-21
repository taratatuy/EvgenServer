const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const text = new Schema(
  {
    textHead: {
      type: String,
      required: true
    },
    textBody: {
      type: String,
      required: true
    },
    textAuthor: {
      type: String
      // required: true
    }
  },
  { timestamps: true }
);

text.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('TextModel', text);
