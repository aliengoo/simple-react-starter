window.jQuery = require('jquery');
window._ = require('lodash');
require('bootstrap');
require('parsleyjs');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import { Provider } from 'react-redux';

import createTodoStore from './routes/todo/store/todo-store';

import App from './routes/app/app.js';
import TodoControllerView from './routes/todo/todo-controller-view';

const store = createTodoStore();

var reactContainer = document.getElementById('react-container');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="/todo" component={TodoControllerView}/>
      </Route>
    </Router>
  </Provider>, reactContainer);