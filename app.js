const express = require('express');
const database = require('./database');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const UserModel = require('./models/user');
const app = express();

//database
database()
  .then()
  .catch(() => {
    console.log('Database Promise Error!');
  });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// express
app.get('/getUser', (req, res) => {
  console.log(req.query);
  const { login, password } = req.query;
  UserModel.find(
    {
      login: login,
      password: password
    },
    (err, data) => {
      if (`${data}` === '') {
        return res.status(400).send('{ getUser: false }');
      } else {
        return res.status(200).send('{ getUser: true }');
      }
    }
  );
});

app.get('/createUser', (req, res) => {
  UserModel.create({
    login: req.query.login,
    password: req.query.password
  })
    .then(() => {
      res.status(201);
      res.send('{ createUser: true }');
    })
    .catch(() => {
      res.status(400);
      res.send('{ createUser: false }');
    });
});

app.listen(config.PORT, console.log(`Listening on port ${config.PORT}. . .`));
