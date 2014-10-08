// --- Require Dependencies ----------------------------------------------------

var ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io, leapIo, lifxIo, blindsIo) {
  io.on('connection', function (socket) {
    socket.on('speech:msg', function (msg) {
      ee.emit('speech:msg', msg);
      ee.emit('status', 'Speech Message --> ' + msg);
    });
  });
};
