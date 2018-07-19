
import React from 'react';
import Card from './card';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createId() {
    return Math.floor(Math.random() * 100000);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`A name was submitted: ${this.state.value}`);
  }

  handleChange(event) {
    console.log('handlechange');
    this.setState({ value: event.target.value });
  }

  render() {
    const jv = this.props.cards.map((item) => (
        <div key={this.createId()}>
          <Card text={item.text} />
        </div>
      ));

    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="card-list">
          {jv}
        </div>
        <form id="js--submit" onSubmit={this.handleSubmit}>
          <div className="js--error-msg form-error" />
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
