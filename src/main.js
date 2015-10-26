window.jQuery = require('jquery');
window._ = require('lodash');
require('bootstrap');
require('parsleyjs');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';

import App from './routes/app/app.js';
import TodoControllerView from './routes/todo/todo-controller-view';

var reactContainer = document.getElementById('react-container');

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/todo" component={TodoControllerView}/>
      <Route path="*" component={TodoControllerView}/>
    </Route>
  </Router>, reactContainer);