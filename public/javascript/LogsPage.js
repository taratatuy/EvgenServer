var consoleText = document.getElementById('consoleText');
var consoleHead = document.getElementById('consoleHead');

fetch('http://localhost:10202/').then(response => {
  response.text().then(data => (consoleHead.innerHTML = data));
});

fetch('http://localhost:10202/consoleText', { method: 'POST' }).then(
  response => {
    response.text().then(data => (consoleText.innerHTML = data));
  }
);

var socket = io.connect('http://localhost:10202');
socket.on('ConsoleText', data => {
  consoleText.innerHTML = data;
});
