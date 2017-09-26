
import React from 'react';
import List from './list';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  createId() {
    return Math.floor(Math.random() * 100000);
  }

  render() {
    const jv = this.props.lists.map((item, idx) => {
      const title=`title-list-${idx + 1}`;
      const cards = [
        { id: this.createId(), text: `${title}-card1` },
        { id: this.createId(), text: `${title}-card2` },
        { id: this.createId(), text: `${title}-card3` },
      ];
      return (
        <div key={this.createId()}>
          <h2>Board title: {item.title}</h2>
          <List title={title} cards={cards} />
        </div>
      );
    });

    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className="list">
          {jv}
        </div>
      </div>
    );
  }
}
