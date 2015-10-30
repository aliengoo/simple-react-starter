"use strict";

window.jQuery = require('jquery');
window._ = require('lodash');
require('bootstrap');
require('parsleyjs');


import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import history from 'history/lib/createHashHistory';

import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import instance from './routes/todo/store/todo-store';

import App from './routes/app/app.js';
import TodoContainer from './routes/todo/containers/todo-container';
import NoMatchContainer from './routes/no-match/containers/no-match-container';

const store = instance();

var reactContainer = document.getElementById('react-container');

var providerRoot = <Provider store={store}>
  <Router history={history()}>
    <Route path="/todo" component={TodoContainer}/>
    <Route path="*" component={NoMatchContainer}/>
  </Router>
</Provider>;

if (reactContainer.hasAttribute("debug")) {
  ReactDOM.render(
    <div>
      {providerRoot}
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
    </div>
    , reactContainer);
} else {
  ReactDOM.render(
    <div>
      {providerRoot}
    </div>
    , reactContainer);
}
