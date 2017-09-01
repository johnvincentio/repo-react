
// js/components/list.js
import React from 'react';
import Card from './card';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="each-board">
                <h2>Board title: {this.props.title}</h2>
                this.props.
            // <div className="list">
            //     {list}
            // </div>
            </div>
        );
    }


}

/*
stateless

export default function List() {
    const card = [];
    for (let i=0; i<3; i++) {
        card.push(<Card />);
    }
    return (
        <h2>{this.props.title}</h2>
        <div className="list">
            {this.props.cards}
        </div>
    );
}
*/
