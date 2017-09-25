
// js/components/board.js
import React from 'react';
import List from './list';

export default function Board() {
    const list = [];
    for (let i=0; i<3; i++) {
        list.push(<List />);
    }

    return (
        <div className="list">
            {list}
        </div>
    );
}
