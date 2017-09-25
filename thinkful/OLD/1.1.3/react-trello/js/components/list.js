
// js/components/list.js
import React from 'react';
import Card from './card';

export default function List() {
    const cards = [];
    for (let i=0; i<3; i++) {
        cards.push(<Card />);
    }
    return (
        <div className="list">
            {cards}
        </div>
    );
}
