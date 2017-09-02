
// js/components/card.js

import React from 'react';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
        console.log("--- Card(constructor)");
    }

    render() {
        console.log("--- Card:render");
        return (
            <div>{this.props.text}</div>
        );
    }
}
