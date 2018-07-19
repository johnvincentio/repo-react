
// import React from 'react';
// import ReactDOM from 'react-dom';

import * as actions from './actions/index';
import store from './store';

store.dispatch(actions.addRepository('joe'));
console.log(store.getState()); // Logs [{ name: 'joe', rating: null}]
