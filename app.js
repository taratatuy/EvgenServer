const express = require('express');
const database = require('./database');
const routes = require('./routes');
const config = require('./config');
const package = require('./package.json');
const app = express();
const startDate = new Date();

//database
database()
  .then()
  .catch(() => {
    console.log('Database Promise Error!');
  });

// uses and sets
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
  res.send(`-v: ${package.version} <br> Last reload: ${startDate}`);
});

app.use('/user', routes.Users);
app.use('/text', routes.Texts);

app.listen(config.PORT, console.log(`Listening on port ${config.PORT}. . .`));
