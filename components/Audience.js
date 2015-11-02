'use strict';

let React = require('react');
let Display = require('./parts/Display');

const Audience = React.createClass({
  render() {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>
          <h1>Join the session</h1>
        </Display>
      </div>
    );
  }
});

module.exports = Audience;
