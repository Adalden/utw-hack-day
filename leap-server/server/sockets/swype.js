// --- Require Dependencies ----------------------------------------------------

var    _ = require('lodash');
var Leap = require('leapjs');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io) {
  var controller = new Leap.Controller({ enableGestures: true });

  var swiper = controller.gesture('swipe');

  var tolerance = 50;
  var cooloff = 300;

  var slider = _.debounce(function(xDir, yDir, zDir) {
    console.log('x: ' + xDir);
    console.log('y: ' + yDir);
    console.log('z: ' + zDir);
    console.log();
    if (xDir) io.emit('leap:swype-lr', xDir);
    if (yDir) io.emit('leap:swype-ud', yDir);
    if (zDir) io.emit('leap:swype-bf', zDir);
    io.emit('leap:swype-all', { x: xDir, y: yDir, z: zDir });
  }, cooloff);

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance || Math.abs(g.translation()[2]) > tolerance) {
      var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] > 0 ? -1 : 1) : 0;
      var zDir = Math.abs(g.translation()[2]) > tolerance ? (g.translation()[2] < 0 ? -1 : 1) : 0;
      slider(xDir, yDir, zDir);
    }
  });

  controller.connect();
};
