
// js/components/list.js
import React from 'react';
import Card from './card';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.props.onChange.bind(this);
        this.handleSubmit = this.props.onSubmit.bind(this);

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit(event) {
    //     alert('A name was submitted: ' + this.state.value);
    //     event.preventDefault();
    // }

    // handleChange(event) {
    //     console.log("handlechange");
    //     this.setState({value: event.target.value});
    // }

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
                <form id="js--submit" onSubmit={this.handleSubmit}>
                    <div className="js--error-msg form-error"></div>
                    <div>
                        <input id="card" name="card" type="text" required placeholder="Card" 
                                value={this.state.value} onChange={this.handleChange} />
                    </div>

                    <button className="submit-button" type="submit">Add Card</button>
                </form>
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
