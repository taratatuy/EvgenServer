const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/createText', (req, res) => {
  res.sendfile('index.html');
});

router.post('/create', (req, res) => {
  models.TextModel.create({
    head: req.body.head,
    body: req.body.body,
    login: req.body.login
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

router.get('/get', (req, res) => {
  models.TextModel.find(
    {
      login: req.query.login
    },
    (err, data) => {
      if (`${data}` === '') {
        console.log(`false TEXT_GET: `, req.query.login);
        return res.status(400).json({ getText: false });
      } else {
        console.log(`true TEXT_GET: `, req.query.login);
        var texts = [];
        data.forEach(post => {
          texts.push({
            head: post.head,
            body: post.body,
            textCreatedAt: post.createdAt
          });
        });
        return res.status(200).json(texts);
      }
    }
  );
});

module.exports = router;
