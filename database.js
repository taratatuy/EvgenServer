const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', !config.IS_PRODUCTION);

    mongoose.connection
      .on('error', error => console.log(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
      });

    mongoose.connect(
      config.MONGO_URL,
      { useNewUrlParser: true }
    );
  });
};
