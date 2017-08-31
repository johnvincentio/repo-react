
import React from 'react';

export default function Person() {
    const name = 'Derek Zoolander';
    const imageUrl = 'https://scontent.cdninstagram.com/t51.2885-19/11377856_626372960798542_1396263462_a.jpg';
    const job = 'Male model';
    return (
        <div className="person">
            <div className="person-name">{name}</div>
            <img className="person-img" src={imageUrl} />
            <div className="person-job">
                {job}
            </div>
        </div>
    );
}
