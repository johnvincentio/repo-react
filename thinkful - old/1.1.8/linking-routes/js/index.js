require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/app';
import ContactListContainer from './components/contact-list-container';
import ContactContainer from './components/contact-container';

const routes = (
  <Router history={hashHistory}>
      <Route path="/contacts" component={App}>
          <IndexRoute component={ContactListContainer} />
          <Route path=":contactId" component={ContactContainer} />
      </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(routes, document.getElementById('app'))
);
