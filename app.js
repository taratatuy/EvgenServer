const express = require('express');
const database = require('./database');
const bodyParser = require('body-parser');
const config = require('./config');
const UserModel = require('./models/user');
const app = express();

//database
database()
  .then()
  .catch(() => {
    console.log('Database Promise Error!');
  });

// uses and sets
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.get('/getUser', (req, res) => {
  const { login, password } = req.query;
  UserModel.find(
    {
      login: login,
      password: password
    },
    (err, data) => {
      if (`${data}` === '') {
        console.log(`false GET: `, req.query);
        return res.status(400).send('{ getUser: false }');
      } else {
        console.log(`true GET: `, req.query);
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
      console.log(`true CREATE: `, req.query);
      res.status(201).send('{ createUser: true }');
    })
    .catch(() => {
      console.log(`false CREATE: `, req.query);
      res.status(400).send('{ createUser: false }');
    });
});

app.listen(config.PORT, console.log(`Listening on port ${config.PORT}. . .`));
