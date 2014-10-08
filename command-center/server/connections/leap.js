// --- Require Dependencies ----------------------------------------------------

var  config = require('config');
var request = require('request');
var      ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io, leapIo, lifxIo, blindsIo) {
  // ** On Leap Swype Up/Down --> Lifx Bulb Dim/Undim
  leapIo.on('leap:swype-ud', function (dir) {
    console.log('posting new color');
    if (dir === 1) {
      ee.emit('speech:msg', 'open:blinds');
      ee.emit('status', 'Leap Swype Up --> Open Blinds');
    } else {
      ee.emit('speech:msg', 'close:blinds');
      ee.emit('status', 'Leap Swype Down --> Close Blinds');
    }
    // BRIGHT += 5000 * dir;
    // if (BRIGHT < 0) BRIGHT = 0;
    // if (BRIGHT > 20000) BRIGHT = 20000;
    // postNewBright();
    // var msg = dir === 1 ? 'Leap Swype Up --> Brighten Lifx Bulb' : 'Leap Swype Down --> Dim Lifx Bulb';
    // ee.emit('status', msg);
  });
};

// --- Private Functions -------------------------------------------------------

// var BRIGHT = 10000;

// // function randomColor() {
// //   return {
// //     r: Math.floor(Math.random() * 255),
// //     g: Math.floor(Math.random() * 255),
// //     b: Math.floor(Math.random() * 255)
// //   };
// // }

// function postNewBright() {
//   console.log(BRIGHT);
//   request({
//     method: 'POST',
//     url: config.lifx + '/bright',
//     json: { l: BRIGHT }
//   }, function (err, body, resp) {
//     console.log(err);
//     console.log(resp);
//   });
// }
