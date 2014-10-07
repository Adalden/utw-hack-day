socket = io.connect();

socket.on('status', function (data) {
  var parent = document.createElement('div');
  parent.className = 'parent';

  var date = document.createElement('div');
  date.className = 'date';
  date.textContent = getDate();
  parent.appendChild(date);

  var msg = document.createElement('div');
  msg.className = 'msg';
  msg.textContent = data;
  parent.appendChild(msg);

  document.getElementById('events').appendChild(parent);
});

function getDate() {
  var d = new Date();
  var arr = [
    d.getHours(),
    ':',
    pad(d.getMinutes()),
    ' ',
    pad(d.getSeconds())
  ];
  return arr.join('');
}

function pad(el) {
  el = '' + el;
  el = el.length === 1 ? '0' + el : el;
  return el;
}
