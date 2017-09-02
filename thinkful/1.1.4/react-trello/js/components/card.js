
// js/components/card.js

import React from 'react';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.text}</div>
        );
    }
}
