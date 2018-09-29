var consoleText = document.getElementById('consoleText');
var consoleHead = document.getElementById('consoleHead');

fetch('http://79.139.225.60:10202/').then(response => {
  response.text().then(data => (consoleHead.innerHTML = data));
});

fetch('http://79.139.225.60:10202/consoleText', { method: 'POST' }).then(
  response => {
    response.text().then(data => (consoleText.innerHTML = data));
  }
);

var socket = io.connect('http://79.139.225.60:10202');
socket.on('ConsoleText', data => {
  consoleText.innerHTML = data;
});
