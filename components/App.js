'use strict';

let React = require('react');
let io = require('socket.io-client');

let Header = require('./parts/Header');

const App = React.createClass({
  getInitialState(){
    return {
      status: 'disconnected',
      title: '',
      dance: 'yo, wow!'
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  },

  connect() {
    this.setState({status: 'connected'});
  },

  disconnect(){
    this.setState({status: 'disconnected'});
  },

  welcome(serverState) {
    this.setState({title: serverState.title});
  },

  render() {
    return (
      <div>
      <Header title={this.state.title} status={this.state.status}/>
      {React.cloneElement(this.props.children, {...this.state})}
      </div>
    );
  }
});

module.exports = App;
