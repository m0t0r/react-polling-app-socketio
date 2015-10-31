'use strict';

let React = require('react');

const Audience = React.createClass({
  render() {
    return (
      <div>
        <h1>Audience {this.props.title}</h1>
      </div>
    );
  }
});

module.exports = Audience;
