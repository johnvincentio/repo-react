require('babel-polyfill');

import React from 'react';
import ReactDOM  from 'react-dom';

import Board from './components/board';

const arr = ['title1', 'title2', 'title3'];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Board title="Board Name from index.js" titles={arr} />, 
        document.getElementById('app')
    );
});

/*
document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(<Board />, document.getElementById('app'))
);
*/
