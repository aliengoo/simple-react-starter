window.jQuery = require('jquery');
window._ = require('lodash');
require('parsleyjs');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';

import HelloWorld from './hello-world.jsx';
import App from './routes/app/app.jsx';
import HomeControllerView from './routes/home/home-controller-view.jsx';
import CustomerControllerView from './routes/customer/customer-controller-view.jsx';

var reactContainer = document.getElementById('react-container');

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/home" component={HomeControllerView}/>
      <Route path="/customer" component={CustomerControllerView}/>
    </Route>
  </Router>, reactContainer);