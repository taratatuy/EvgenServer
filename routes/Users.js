const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/create', (req, res) => {
  models.UserModel.create({
    login: req.query.login,
    password: req.query.password,
    email: req.query.email
  })
    .then(() => {
      console.log(`true USER_CREATE: `, req.query);
      res.status(201).json({ createUser: true });
    })
    .catch(() => {
      console.log(`false USER_CREATE: `, req.query);
      res.status(400).json({ createUser: false });
    });
});

router.get('/get', (req, res) => {
  const { login, password } = req.query;
  models.UserModel.find(
    {
      login: login,
      password: password
    },
    (err, data) => {
      if (`${data}` === '') {
        console.log(`false USER_GET: `, req.query);
        return res.status(400).json({ getUser: false });
      } else {
        console.log(`true USER_GET: `, req.query);
        return res.status(200).json({ getUser: true });
      }
    }
  );
});

module.exports = router;
