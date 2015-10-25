'use strict';

var React = require('react');
var io = require('socket.io-client');

var App = React.createClass({
  componentWillMount() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', this.connect);
  },

  connect() {
    alert('Connected: ' + this.socket.id);
  },

  render() {
    return (
      <h1>React is ready! ;)</h1>
    );
  }
});

module.exports = App;