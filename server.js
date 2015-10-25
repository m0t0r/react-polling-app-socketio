'use strict';

var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.on('connection', function(socket) {
  console.log('Connected %s', socket.id);
});

server.listen(8080, console.log('Server is running at \'http://localhost:8080\''));