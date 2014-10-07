// --- Require Dependencies ----------------------------------------------------

var ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io) {
  listenToColors(io);
};

// --- Exported Functions ------------------------------------------------------

function listenToColors(io) {
  ee.on('power', function (state) {
    io.sockets.emit('lifx:power', state);
  });
  ee.on('color', function (color) {
    io.sockets.emit('lifx:color', color);
  });
}
