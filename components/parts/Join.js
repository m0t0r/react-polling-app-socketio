'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

const Join = React.createClass({

  join(e) {
    e.preventDefault();
    let memberName = this.refs.fullName.value.trim();
    this.props.emit('join', {name: memberName});
  },

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label htmlFor="fullName">Full Name:</label>
        <input ref="fullName" type="text" id="fullName" className="form-control" placeholder="Enter your full name..." required/>
        <button className="btn btn-primary">Join</button>
      </form>
    );
  }
});

module.exports = Join;
