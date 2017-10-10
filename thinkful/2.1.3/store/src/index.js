
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import RepositoryList from './components/repository-list';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <Provider store={store}>
          <RepositoryList />
      </Provider>,
      document.getElementById('root'),
  );
});

/*
import * as actions from './actions/index';
import store from './store';

store.dispatch(actions.addRepository('joe'));
console.log(store.getState()); // Logs [{ name: 'joe', rating: null}]
*/
