require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import ContactListContainer from './components/contact-list-container';

const routes = (
  <Router history={hashHistory}>
    <Route path="/contacts" component={ContactListContainer} />
  </Router>
);

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(routes, document.getElementById('app'))
);
