const express = require('express');
const models = require('../models');
const channel = require('../EventChannel.js');
const router = express.Router();

router.get('/createText', (req, res) => {
  res.sendfile('index.html');
});

router.post('/create', (req, res) => {
  const { head, body, login } = req.body;
  const createdAt = new Date();
  models.TextModel.create({
    head: head,
    body: body,
    login: login.toString().toLowerCase(),
    createdAt: createdAt.toString()
  })
    .then(() => {
      // console.log(req.ip, `true TEXT_CREATE: `, req.body);
      channel.emit(
        'ConsoleText',
        req.ip + `  true TEXT_CREATE:  ` + JSON.stringify(req.body)
      );
      res.status(201).json({ createText: true });
    })
    .catch(() => {
      // console.log(req.ip, `false TEXT_CREATE: `, req.body);
      channel.emit(
        'ConsoleText',
        req.ip + `  false TEXT_CREATE:  ` + JSON.stringify(req.body)
      );
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
        // console.log(req.ip, `false TEXT_GET: `, req.query.login);
        channel.emit(
          'ConsoleText',
          req.ip + `  false TEXT_GET:  ` + req.query.login
        );
        return res.status(400).json({ getText: false });
      } else {
        // console.log(req.ip, `true TEXT_GET: `, req.query.login);
        channel.emit(
          'ConsoleText',
          req.ip + `  true TEXT_GET:  ` + req.query.login
        );
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

  router.get('/delete', (req, res) => {
    models.TextModel.findOneAndDelete({
      login: req.query.login.toString().toLowerCase(),
      createdAt: req.query.createdAt
    })
      .then(() => {
        channel.emit(
          'ConsoleText',
          `${req.ip}  true TEXT_DELETE  ` + req.query.head
        );
        return res.status(200).json({ textDeleted: true });
      })
      .catch(() => {
        channel.emit(
          'ConsoleText',
          `${req.ip}  false TEXT_DELETE  ` + req.query
        );
        return res.status(501).json({ textDeleted: false });
      });
  });
});

module.exports = router;
