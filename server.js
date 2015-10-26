'use strict';

var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var connections = [];
var defaults = {
  title: 'Untitled presentation'
};

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.on('connection', function(socket) {
  connections.push(socket);

  // set default title
  socket.emit('welcome', {title: defaults.title});

  socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('A socket was disconnected. %s sockets remaining', connections.length);
  });

  console.log('Connected %s sockets', connections.length);
});

server.listen(8080, console.log('Server is running at \'http://localhost:8080\''));