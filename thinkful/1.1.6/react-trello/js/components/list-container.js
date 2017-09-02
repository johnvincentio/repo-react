
// js/components/list-container.js
import React from 'react';
import List from './list';

export default class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log("--- ListContainer(constructor)");
        this.state = {
            value: '',
            cards: ['aaa', 'bbb']
        };
        this.handleChange = this.onAddInputChanged.bind(this);
        this.handleSubmit = this.onAddSubmit.bind(this);
    }

    onAddSubmit(event) {
        event.preventDefault();
        console.log('>>> list-container::onAddSubmit; A name was submitted: ' + this.state.value);
//        this.state.cards.push(this.state.value);
        let tmp = this.state.cards;
        tmp.push(this.state.value);
        // tmp.push('zzz');
        this.setState({cards: tmp});
        console.log(this.state.cards);
        console.log('<<< list-container::onAddSubmit');
    }

    onAddInputChanged(event) {
        console.log("(list-container) onAddInputChanged; value "+event.target.value);
        this.setState({value: event.target.value});
        //this.state.value = event.target.value;
    }

    render() {
        console.log("--- list-container:render");
        return (
            <List cards={this.state.cards} 
                onAddInputChanged={this.handleChange}
                onAddSubmit={this.handleSubmit}/>
        );
    }
}
