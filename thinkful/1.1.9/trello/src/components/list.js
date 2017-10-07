
import React from 'react';
import Card from './card';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.props.onAddInputChanged.bind(this);
    this.handleSubmit = this.props.onAddSubmit.bind(this);
  }

  render() {
    const jv = this.props.cards.map((item, idx) => {
      return (
          <div key={Math.floor(Math.random() * 100000)}>
              <Card text={item} />
          </div>
      );
    });

    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="card-list">
          {jv}
        </div>
        <form id="js--submit" onSubmit={this.handleSubmit}>
          <div className="js--error-msg form-error" />
          <div>
              <input id="card" name="card" type="text" 
                required
                placeholder="Card"
                onBlur={this.handleChange}
              />
          </div>
          <button className="submit-button" type="submit">Add Card</button>
        </form>
      </div>
    );
  }
}
