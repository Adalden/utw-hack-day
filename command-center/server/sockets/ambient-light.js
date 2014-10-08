// --- Require Dependencies ----------------------------------------------------

var ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connection');
    socket.emit('ambient-light', 'go');

    socket.on('light', function(data) {
      ee.emit('ambient-light', data);
      console.log('light: ');
      console.log(data);

      if (data > 500) {
        ee.emit('speech:msg', 'close:blinds');
      } else if (data > 150) {
        ee.emit('speech:msg', 'open:blinds');
      } else if (data < 50) {
        ee.emit('speech:msg', 'close:blinds');
      }
    });

  });
};
