'use strict';

let React = require('react');
let Display = require('./parts/Display');
let Join = require('./parts/Join');

const Audience = React.createClass({
  render() {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>

          <Display if={this.props.member.name}>
            <h2>Welcome {this.props.member.name}</h2>
            <p>{this.props.audience.length} audience members connected</p>
            <p>Questions will appear here</p>
          </Display>

          <Display if={!this.props.member.name}>
            <h1>Join the session</h1>
            <Join emit={this.props.emit}/>
          </Display>
        </Display>
      </div>
    );
  }
});

module.exports = Audience;
