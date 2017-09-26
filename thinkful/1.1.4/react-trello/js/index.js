
import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';

require('babel-polyfill');

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(<Board />, document.getElementById('app')),
);
