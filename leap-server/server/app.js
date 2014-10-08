// --- Require Dependencies ----------------------------------------------------

var       http = require('http');
var         fs = require('fs');
var         io = require('socket.io');
var     config = require('config');

// --- Setup Sockets -----------------------------------------------------------

var server = http.Server(app.callback());
io = io(server);

fs.readdirSync(__dirname + '/sockets').forEach(function (filename) {
  if (filename[0] === '.') return;
  require('./sockets/' + filename)(io);
});

// --- Start Listening ---------------------------------------------------------

server.listen(config.port);
console.log('Server listening on port ' + config.port);
