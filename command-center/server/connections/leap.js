// --- Require Dependencies ----------------------------------------------------

var  config = require('config');
var request = require('request');
var      ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io, leapIo, lifxIo, blindsIo) {
  // ** On Leap Swype --> Randomize Lifx Bulb
  leapIo.on('leap:swype-ud', function (dir) {
    var color = randomColor();
    postNewColor(color);
    ee.emit('status', 'Leap Swype --> Random Lifx Color');
  });
};

// --- Private Functions -------------------------------------------------------

function randomColor() {
  return {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  };
}

function postNewColor(color) {
  request({
    method: 'POST',
    url: config.lifx + '/color',
    json: color
  }, function (err, body, resp) {
    console.log(err);
    console.log(resp);
  });
}
