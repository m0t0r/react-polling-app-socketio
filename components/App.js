'use strict';

let React = require('react');
let io = require('socket.io-client');

let Header = require('./parts/Header');

const App = React.createClass({
  getInitialState(){
    return {
      status: 'disconnected',
      title: '',
      member: {},
      audience: []
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
  },

  connect() {
    var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

    if(member) {
      this.emit('join', member);
    }
    this.setState({status: 'connected'});
  },

  disconnect() {
    this.setState({status: 'disconnected'});
  },

  welcome(serverState) {
    this.setState({title: serverState.title});
  },

  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({member: member});
  },

  updateAudience(audience) {
    this.setState({audience: audience});
  },

  emit(event, payload) {
    this.socket.emit(event, payload);
  },

  render() {
    return (
      <div>
      <Header title={this.state.title} status={this.state.status}/>
      {React.cloneElement(this.props.children, {...this.state, emit: this.emit})}
      </div>
    );
  }
});

module.exports = App;
