'use strict';

let React = require('react');
let io = require('socket.io-client');

let Header = require('./Header');

const App = React.createClass({
  componentWillMount() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', this.connect);
  },

  connect() {
    console.log('Connected: ' + this.socket.id);
  },

  render() {
    return (
      <div>
      <Header title='Polling App'/>
      </div>
    );
  }
});

module.exports = App;