
import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';

function createId() {
  return Math.floor(Math.random() * 100000);
}

const data = [
  { id: createId(), title: 'board-title1' },
  { id: createId(), title: 'board-title2' },
  { id: createId(), title: 'board-title3' },
];

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Board title="Board Name from index.js" lists={data} />,
    document.getElementById('root'),
  ),
);
