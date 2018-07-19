
import React from 'react';
import Card from './card';

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  createId() {
    return Math.floor(Math.random() * 100000);
  }

  render() {
    const jv = this.props.cards.map((item, idx) => {
      return (
        <div key={this.createId()}>
          <Card text={item.text} />
        </div>
      );
    });

    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="card-list">
          {jv}
        </div>
      </div>
    );
  }
}
