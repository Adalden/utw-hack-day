// --- Require Dependencies ----------------------------------------------------

var       http = require('http');
var         fs = require('fs');
var         io = require('socket.io');
var   ioClient = require('socket.io-client');
var     config = require('config');

var        koa = require('koa');
var      serve = require('koa-static');

// --- Setup Koa ---------------------------------------------------------------

var app = koa();

app.use(serve('./client'));

var server = http.Server(app.callback());

// --- Setup Sockets -----------------------------------------------------------

io = io(server);

fs.readdirSync(__dirname + '/sockets').forEach(function (filename) {
  if (filename[0] === '.') return;
  require('./sockets/' + filename)(io);
});

// --- Setup Connections -------------------------------------------------------

var leapIo = ioClient.connect(config.leap);
var lifxIo = ioClient.connect(config.lifx);
// var blindsIo = ioClient.connect(config.blinds);

fs.readdirSync(__dirname + '/connections').forEach(function (filename) {
  if (filename[0] === '.') return;
  require('./connections/' + filename)(io, leapIo, lifxIo); //, blindsIo);
});

// --- Start Listening ---------------------------------------------------------

server.listen(config.port);
console.log('Server listening on port ' + config.port);
