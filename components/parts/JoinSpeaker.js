'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

const JoinSpeaker = React.createClass({

  start(e) {
    e.preventDefault();
    let speakerName = this.refs.fullName.value.trim();
    let title = this.refs.title.value.trim();
    this.props.emit('start', {name: speakerName, title: title});
  },

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.start}>
        <label htmlFor="fullName">Full Name:</label>
        <input ref="fullName" type="text" id="fullName" className="form-control" placeholder="Enter your full name..." required/>
        <label htmlFor="fullName">Presentation title:</label>
        <input ref="title" type="text" id="title" className="form-control" placeholder="Enter your presentation title..." required/>
        <button className="btn btn-primary">Join</button>
      </form>
    );
  }
});

module.exports = JoinSpeaker;
