require('babel-polyfill');

import React from 'react';
import ReactDOM  from 'react-dom';

import Board from './components/board';

function createId() {
    return Math.floor(Math.random() * 100000);
}

document.addEventListener('DOMContentLoaded', () => {
    const data = [
        {
            id: createId(),
            title: 'title-1',
            list: {
                id: createId(),
                title: 'list-title-1',
                cards: [
                    {id: createId(), text: '1-card1'},
                    {id: createId(), text: '1-card2'},
                    {id: createId(), text: '1-card3'},                   
                ]
            }
        },
        {
            id: createId(),
            title: 'title-2',
            list: {
                id: createId(),
                title: 'list-title-2',
                cards: [
                    {id: createId(), text: '2-card1'},
                    {id: createId(), text: '2-card2'},
                    {id: createId(), text: '2-card3'},
                    {id: createId(), text: '2-card4'}, 
                ]
            }
        }
    ];
    ReactDOM.render(
        <Board title="Board Name from index.js" lists={data} />, 
            document.getElementById('app')
    );
});

/*
document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(<Board />, document.getElementById('app'))
);
*/
