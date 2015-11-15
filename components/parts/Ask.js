'use strict';

let React = require('react');
let Display = require('./Display');

const Ask = React.createClass({

  getInititalState() {
    return {
      choices: [],
      answer: ''
    }
  },

  componentWillMount() {
    this.loadChoices();
  },

  componentWillReceiveProps() {
    this.loadChoices();
  },

  loadChoices() {
    console.log('sessionStorage.answer', sessionStorage.answer);
    var choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({
      choices: choices,
      answer: sessionStorage.answer
    });
  },

  addChoice(choice, i) {
    var buttonTypes = ['primary', 'success', 'warning', 'danger'];
    return(
      <button onClick={this.selectChoice.bind(null, choice)} key={i} className={"col-xs-12 col-sm-6 btn btn-" + buttonTypes[i]}>
        {choice}: {this.props.question[choice]}
      </button>
    );
  },

  selectChoice(choice) {
    this.setState({answer: choice});
    sessionStorage.answer = choice;
    this.props.emit('answer', {
      question: this.props.question,
      choice: choice
    });
  },

  render() {
    return (
      <div id="currentQuestion">
        <Display if={this.state.answer}>
          <h3>You answered: {this.state.answer}</h3>
          <p>{this.props.question[this.state.answer]}</p>
        </Display>
        <Display if={!this.state.answer}>
          <h2>{this.props.question.q}</h2>
          <div className="row">
            {this.state.choices.map(this.addChoice)}
          </div>
        </Display>
      </div>
    );
  }
});

module.exports = Ask;
