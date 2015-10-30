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

import instance from './shared/store/app-store';

import TodoContainer from './routes/todo/todo-container';
import ChatContainer from './routes/chat/chat-container';
import NoMatchContainer from './routes/no-match/no-match-container';

const store = instance();

var reactContainer = document.getElementById('react-container');

var providerRoot = <Provider store={store}>
  <Router history={history()}>
    <Route path="/todo" component={TodoContainer}/>
    <Route path="/chat" component={ChatContainer}/>
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
