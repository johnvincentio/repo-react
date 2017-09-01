
// js/components/list-container.js
import React from 'react';
// import List from './list';

export default class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            cards: []
        };
    }
}

