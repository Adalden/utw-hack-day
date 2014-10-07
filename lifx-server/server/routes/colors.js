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
  app.use(routes.post('/bright', setBrightness));
};

var LAST = color.rgbToHsl(255, 0, 0);
LAST.l = 10000;

// --- Exported Functions ------------------------------------------------------

function* setColor() {
  console.log('setting color');
  var b = this.request.body;
  var hsl = color.rgbToHsl(b.r, b.g, b.b);
  hsl.l = LAST.l;
  LAST = hsl;
  set.call(this);
}

function* setBrightness() {
  var b = this.request.body;
  LAST.l = b.l;
  set.call(this);
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

function set() {
  lx.lightsOn();
  lx.lightsColour(LAST.h, LAST.s, LAST.l, 0x0dac, 300);
  ee.emit('color', LAST);
  this.body = 'Message Sent';
}
