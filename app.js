const express = require('express');
const database = require('./database');
const config = require('./config');
const routes = require('./routes');
const app = express();

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
app.use('/user', routes.Users);
app.use('/text', routes.Texts);

app.listen(config.PORT, console.log(`Listening on port ${config.PORT}. . .`));
