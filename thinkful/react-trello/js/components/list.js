
// js/components/list.js
import React from 'react';
import Card from './card';


export default function List() {
    const card = [];
    for (let i=0; i<3; i++) {
        card.push(<Card />);
    }
    return (
        <div className="list">
            {card}
        </div>
    );
}
