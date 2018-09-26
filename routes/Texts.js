const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/createText', (req, res) => {
  res.sendfile('index.html');
});

router.post('/create', (req, res) => {
  const { head, body, login } = req.body;
  models.TextModel.create({
    head: head,
    body: body,
    login: login.toString().toLowerCase()
  })
    .then(() => {
      console.log(req.ip, `true TEXT_CREATE: `, req.body);
      res.status(201).json({ createText: true });
    })
    .catch(() => {
      console.log(req.ip, `false TEXT_CREATE: `, req.body);
      res.status(500).json({ createText: false });
    });
});

router.get('/get', (req, res) => {
  models.TextModel.find(
    {
      login: req.query.login.toString().toLowerCase()
    },
    (err, data) => {
      if (`${data}` === '') {
        console.log(req.ip, `false TEXT_GET: `, req.query.login);
        return res.status(400).json({ getText: false });
      } else {
        console.log(req.ip, `true TEXT_GET: `, req.query.login);
        var texts = [];
        data.forEach(post => {
          texts.push({
            head: post.head,
            body: post.body,
            textCreatedAt: post.createdAt
          });
        });
        // res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(texts);
      }
    }
  );
});

module.exports = router;
