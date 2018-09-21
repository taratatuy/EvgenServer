const express = require('express');
const database = require('./database');
const bodyParser = require('body-parser');
const config = require('./config');
const UserModel = require('./models/user');
const TextModel = require('./models/text');
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
        return res.status(400).json({ getUser: false });
      } else {
        console.log(`true GET: `, req.query);
        return res.status(200).json({ getUser: true });
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
      res.status(201).json({ createUser: true });
    })
    .catch(() => {
      console.log(`false CREATE: `, req.query);
      res.status(400).json({ createUser: false });
    });
});

app.get('/createText', (req, res) => {
  res.sendfile('index.html');
});

app.post('/createText', (req, res) => {
  // res.sendfile('index.html');
  TextModel.create({
    textHead: req.body.head,
    textBody: req.body.body,
    textAuthor: req.body.author
  })
    .then(() => {
      console.log(`true TEXT_CREATE: `, req.body);
      res.status(201).json({ createText: true });
    })
    .catch(() => {
      console.log(`false TEXT_CREATE: `, req.body);
      res.status(500).json({ createText: false });
    });
});

app.get('/getText/:author', (req, res) => {
  TextModel.find(
    {
      textAuthor: req.params.author
    },
    (err, data) => {
      if (`${data}` === '') {
        console.log(`false GET: `, req.params.author);
        return res.status(400).json({ getText: false });
      } else {
        console.log(`true GET: `, req.params.author);
        var texts = [];
        data.forEach(post => {
          texts.push({
            textHead: post.textHead,
            textBody: post.textBody,
            textCreatedAt: post.createdAt
          });
        });
        console.log('TEXTS: ', texts);
        return res.status(200).json(texts);
      }
    }
  );
});

app.listen(config.PORT, console.log(`Listening on port ${config.PORT}. . .`));
