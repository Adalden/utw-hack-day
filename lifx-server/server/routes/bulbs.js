// --- Require Dependencies ----------------------------------------------------

var      _ = require('lodash');
var routes = require('koa-route');
var     lx = require('../utils/lifx');

// --- Module Exports ----------------------------------------------------------

module.exports = function (app) {
  app.use(routes.get('/bulbs', getBulbs));
  app.use(routes.get('/bulbs/raw', getRawBulbs));
};

// --- Exported Functions ------------------------------------------------------

function* getBulbs() {
  this.body = _.pluck(lx.bulbs, 'name');
}

function* getRawBulbs() {
  this.body = lx.bulbs;
}
