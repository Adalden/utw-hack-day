// --- Require Dependencies ----------------------------------------------------

var      _ = require('lodash');
var routes = require('koa-route');
var     lx = require('../utils/lifx');
var  color = require('../utils/colors');
var     ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function (app) {
  app.use(routes.post('/on', turnOn));
  app.use(routes.post('/off', turnOff));
  app.use(routes.post('/color', setColor));
};

// --- Exported Functions ------------------------------------------------------

function* setColor() {
  var b = this.request.body;
  var hsl = color.rgbToHsl(b.r, b.g, b.b);
  lx.lightsOn();
  lx.lightsColour(hsl.h, hsl.s, 10000, 0x0dac, 300)
  ee.emit('color', hsl);
  this.body = 'Message Sent';
}

function* turnOff() {
  lx.lightsOff();
  ee.emit('power', 'off');
  this.body = 'Message Sent';
}

function* turnOn() {
  lx.lightsOn();
  ee.emit('power', 'on');
  this.body = 'Message Sent';
}
