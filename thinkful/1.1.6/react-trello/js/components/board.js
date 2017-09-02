
// js/components/board.js
import React from 'react';
import ListContainer from './list-container';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div key={Math.floor(Math.random() * 100000)}>
                <h2>Board main title: Any title</h2>
                <ListContainer />
            </div>
        );
    }
}
