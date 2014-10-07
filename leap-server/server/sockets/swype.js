// --- Require Dependencies ----------------------------------------------------

var    _ = require('lodash');
var Leap = require('leapjs');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io) {
  var controller = new Leap.Controller({ enableGestures: true });

  var swiper = controller.gesture('swipe');

  var tolerance = 50;
  var cooloff = 300;

  var slider = _.debounce(function(xDir, zDir) {
    console.log('x: ' + xDir);
    console.log('z: ' + zDir);
    console.log();
    if (xDir) io.emit('leap:swype-lr', xDir);
    if (zDir) io.emit('leap:swipe-tb', zDir);
  }, cooloff);

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[2]) > tolerance) {
      var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var zDir = Math.abs(g.translation()[2]) > tolerance ? (g.translation()[2] < 0 ? -1 : 1) : 0;
      slider(xDir, zDir);
    }
  });

  controller.connect();
};
