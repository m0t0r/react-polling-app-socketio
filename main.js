'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Router = require('react-router').Router;
let Route = require('react-router').Route;
let IndexRoute = require('react-router').IndexRoute;

let App = require('./components/App');
let Audience = require('./components/Audience');
let Speaker = require('./components/Speaker');
let Board = require('./components/Board');
let Whoops404 = require('./components/Whoops404');


ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Audience}/>
      <Route name='speaker' path='speaker' component={Speaker} />
      <Route name='board' path="board" component={Board} />
      <Route path="*" component={Whoops404}/>
    </Route>
  </Router>
), document.getElementById('react-container'));