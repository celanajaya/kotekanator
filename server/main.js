'use strict';
var chalk = require('chalk');

// Create a node server instance! cOoL!
var server = require('http').createServer();
var app = require('./app');

server.on('request', app); // Attach the Express application.
require('./io')(server);   // Attach socket.io.

var PORT = process.env.PORT || 1337;

server.listen(PORT, function () {
    console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
});