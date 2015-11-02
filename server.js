'use strict';

var express = require('express');
var _ = require('lodash');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var connections = [];
var audience = [];
var defaults = {
  title: 'Untitled presentation'
};

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.on('connection', function(socket) {
  connections.push(socket);

  socket.on('join', function(payload) {
    var newMember = {
      id: this.id,
      name: payload.name
    };
    audience.push(newMember);
    this.emit('joined', newMember);

    io.sockets.emit('audience', audience);
  });

  // set default title
  socket.emit('welcome', {title: defaults.title});

  socket.once('disconnect', function() {
    var member = _.findWhere(audience, {id: this.id});

    if(member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit('audience', audience);
      console.log('Left: %s, (%s audience members connected)', member.name, audience.length);
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('A socket was disconnected. %s sockets remaining', connections.length);
  });

  console.log('Connected %s sockets', connections.length);
});

server.listen(8080, console.log('Server is running at \'http://localhost:8080\''));