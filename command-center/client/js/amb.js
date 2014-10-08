socket = io.connect();

socket.on('ambient-light', function(data) {
  alert(data);
  var light = 0;
  window.addEventListener('devicelight', function(event) {
    light = event.value;
  });
  setInterval(function() {
    socket.emit('light', light);
  }, 333);
});