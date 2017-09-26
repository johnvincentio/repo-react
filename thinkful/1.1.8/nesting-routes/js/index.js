require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import ContactListContainer from './components/contact-list-container';
import App from './components/app';

const routes = (
  <Router history={hashHistory}>
    <Route path="/contacts" component={App}>
      <IndexRoute component={ContactListContainer} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(routes, document.getElementById('app')),
);
