var consoleText = document.getElementById('consoleText');
var consoleHead = document.getElementById('consoleHead');
var IP = '91.79.21.180';

fetch(`http://${IP}:10202/`).then(response => {
  response.text().then(data => (consoleHead.innerHTML = data));
});

fetch(`http://${IP}:10202/consoleText`, { method: 'POST' }).then(
  response => {
    response.text().then(data => (consoleText.innerHTML = data));
  }
);

var socket = io.connect(`http://${IP}:10202`);
socket.on('ConsoleText', data => {
  consoleText.innerHTML = data;
});
