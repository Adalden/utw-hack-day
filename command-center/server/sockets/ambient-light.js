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
    });

  });
};
