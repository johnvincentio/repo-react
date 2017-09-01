
// js/components/list.js
import React from 'react';
import Card from './card';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const jv = this.props.cards.map((item, idx) => {
            return (
                <div key={item.id}>
                    <Card text={item.text}/>
                </div>
            )
        });
        return (
            <div>
                {jv}
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
