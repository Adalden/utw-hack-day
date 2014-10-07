// --- Require Dependencies ----------------------------------------------------

var  _ = require('lodash');
var lx = require('../utils/lifx');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io) {
  listenToBulb(io);
};

// --- Exported Functions ------------------------------------------------------

function listenToBulb(io) {
  lx.on('bulb', function (bulb) {
    console.log('Found a bulb');
    io.sockets.emit(bulb);
  });
}
