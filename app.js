const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const database = require('./database');
const routes = require('./routes');
const TokensValidation = require('./routes/middleware/TokensValidation');
const config = require('./config');
const package = require('./package.json');
const channel = require('./EventChannel.js');

const startDate = new Date();
var consoleText = '';

// Database
database()
  .then()
  .catch(() => {
    // console.log('Database Promise Error!');
    channel.emit('ConsoleText', 'Database Promise Error!');
  });

// Uses and sets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EventEmitter
channel.on('ConsoleText', data => {
  console.log(data);
  consoleText += data + ' <br>';
  io.emit('ConsoleText', consoleText);
});

// JS routes
app.post('/consoleText', (req, res) => {
  // io.emit('ConsoleText', consoleText);
  res.send(consoleText);
});

// Users routes
app.get('/', (req, res) => {
  console.log(req.ip, 'versoin check');
  // channel.emit('ConsoleText', `${req.ip}, versoin check`);
  res.send(`-v: ${package.version} <br> Last reload: ${startDate}`);
});

app.get('/consoleLogs', (req, res) => {
  res.sendFile('./views/LogsPage.html', { root: __dirname });
});

app.use('/user', routes.Users);
app.use('/text', TokensValidation, routes.Texts);

server.listen(
  config.PORT,
  // console.log(`Listening on port ${config.PORT}. . .`)
  () => {
    channel.emit('ConsoleText', `Listening on port ${config.PORT}. . .`);
  }
);
