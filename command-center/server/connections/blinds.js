// --- Require Dependencies ----------------------------------------------------

var  config = require('config');
var request = require('request');
var      ee = require('../utils/events');

// --- Module Exports ----------------------------------------------------------

module.exports = function (io, leapIo, lifxIo, blindsIo) {
  ee.on('speech:msg', function (msg) {
    if (msg === 'light:on') {
      turnLightOn();
    } else if (msg === 'light:off') {
      turnLightOff();
    } else if (msg === 'open:blinds') {
      openBlinds();
      turnLightOff();
    } else if (msg === 'close:blinds') {
      closeBlinds();
      turnLightOn();
    }
  });
};

// --- Private Functions -------------------------------------------------------

function turnLightOn() {
  console.log('turnLightOn');
  request({
    method: 'POST',
    url: config.lifx + '/on',
  }, function (err, body, resp) {
    console.log(err);
    console.log(resp);
  });
}

function turnLightOff() {
  console.log('turnLightOff');
  request({
    method: 'POST',
    url: config.lifx + '/off',
  }, function (err, body, resp) {
    console.log(err);
    console.log(resp);
  });
}

function openBlinds() {
  console.log('openBlinds');
  console.log(config.blinds + '/rotate/90');
  var r = request({
    method: 'GET',
    url: config.blinds + '/rotate/90'
  });

  r.on('error', function (err) {
    console.log(err);
  });
}

function closeBlinds() {
  console.log('closeBlinds');
  console.log(config.blinds + '/rotate/180');
  var r = request({
    method: 'GET',
    url: config.blinds + '/rotate/180'
  });

  r.on('error', function (err) {
    console.log(err);
  });
}
