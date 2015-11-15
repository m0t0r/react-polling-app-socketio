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
      audience: [],
      speaker: '',
      questions: [],
      currentQuestion: ''
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.updateState);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
    this.socket.on('start', this.start);
    this.socket.on('end', this.updateState);
    this.socket.on('ask', this.askQuestion);
  },

  connect() {
    var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

    if(member && member.type === 'member') {
      this.emit('join', member);
    } else if (member && member.type === 'speaker') {
      this.emit('start', {name: member.name, title: sessionStorage.title});
    }
    this.setState({status: 'connected'});
  },

  disconnect() {
    this.setState({
      status: 'disconnected',
      title: 'Disconnected',
      speaker: ''
    });
  },

  updateState(serverState) {
    this.setState(serverState);
  },

  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({member: member});
  },

  updateAudience(audience) {
    this.setState({audience: audience});
  },

  start(presentation) {
    if (this.state.member.type === 'speaker') {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  },

  askQuestion(question) {
    sessionStorage.answer = '';
    this.setState({currentQuestion: question});
  },

  emit(event, payload) {
    this.socket.emit(event, payload);
  },

  render() {
    return (
      <div>
      <Header {...this.state}/>
      {React.cloneElement(this.props.children, {...this.state, emit: this.emit})}
      </div>
    );
  }
});

module.exports = App;
