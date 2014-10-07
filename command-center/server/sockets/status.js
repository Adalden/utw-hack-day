// --- Require Dependencies ----------------------------------------------------

var ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io) {
  ee.on('status', function (data) {
    io.sockets.emit('status', data);
  });
};
