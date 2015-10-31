'use strict';

let React = require('react');

const Speaker = React.createClass({
  render() {
    return (
      <div>
        <h1>Speaker {this.props.dance}</h1>
      </div>
    );
  }
});

module.exports = Speaker;
