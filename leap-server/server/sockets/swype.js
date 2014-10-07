// --- Require Dependencies ----------------------------------------------------

var    _ = require('lodash');
var Leap = require('leapjs');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io) {
  var controller = new Leap.Controller({ enableGestures: true });

  var swiper = controller.gesture('swipe');

  var tolerance = 50;
  var cooloff = 300;

  var x = 2, y = 2;

  var slider = _.debounce(function(xDir, yDir) {
    console.log('x: ' + xDir);
    console.log('y: ' + yDir);
    console.log();
    if (xDir) io.emit('leap:swype-lr', xDir);
    if (yDir) io.emit('leap:swipe-tb', yDir);
  }, cooloff);

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance) {
      var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
      slider(xDir, yDir);
    }
  });

  controller.connect();
};
