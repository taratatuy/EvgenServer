const express = require('express');
const models = require('../models');
const auth = require('../auth');
const router = express.Router();

router.get('/create', (req, res) => {
  models.UserModel.create({
    login: req.query.login.toString().toLowerCase(),
    password: req.query.password,
    email: req.query.email.toString().toLowerCase()
  })
    .then(() => {
      console.log(req.ip, `true USER_CREATE: `, req.query);
      res.status(201).json({ createUser: true });
    })
    .catch(() => {
      console.log(req.ip, `false USER_CREATE: `, req.query);
      res.status(400).json({ createUser: false });
    });
});

router.get('/get', (req, res) => {
  var { login, password } = req.query;
  models.UserModel.find(
    {
      login: login.toString().toLowerCase(),
      password: password
    },
    (err, data) => {
      if (`${data}` === '') {
        console.log(req.ip, `false USER_GET: `, req.query);
        return res.status(400).json({ getUser: false });
      } else {
        console.log(req.ip, `true USER_GET: `, req.query);
        auth.updateTokens(data._id).then(tokens => {
          return res.status(200).json(tokens);
        });
      }
    }
  );
});

router.post('/refresh-tokens', auth.refreshTokens);

module.exports = router;
