// --- Require Dependencies ----------------------------------------------------

var       http = require('http');
var         fs = require('fs');
var         io = require('socket.io');
var     config = require('config');

var        koa = require('koa');
var      serve = require('koa-static');
var bodyParser = require('koa-body-parser');

// --- Setup Koa ---------------------------------------------------------------

var app = koa();

app.use(bodyParser());
app.use(serve('./client'));

// --- Setup Routes ------------------------------------------------------------

fs.readdirSync(__dirname + '/routes').forEach(function (filename) {
  if (filename[0] === '.') return;
  require('./routes/' + filename)(app);
});

var server = http.Server(app.callback());

// --- Setup Sockets -----------------------------------------------------------

io = io(server);

fs.readdirSync(__dirname + '/sockets').forEach(function (filename) {
  if (filename[0] === '.') return;
  require('./sockets/' + filename)(io);
});

// --- Start Listening ---------------------------------------------------------

server.listen(config.port);
console.log('Server listening on port ' + config.port);
