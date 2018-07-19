
import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from './list-container';
import Utils from '../utils';

function Board(props) {
  const tmp = props.lists.map((item, idx) => {
    const title = `title-list-${idx + 1}`;
    const cards = [
        { id: Utils.createId(), text: `${title}-card1` },
        { id: Utils.createId(), text: `${title}-card2` },
        { id: Utils.createId(), text: `${title}-card3` },
    ];
    return (
      <div key={Utils.createId()}>
        <h2>Board title: {item.title}</h2>
        <ListContainer title={title} cards={cards} />
      </div>
    );
  });

  return (
    <div>
      <h1>{props.title}</h1>
      <div className="list">
        {tmp}
      </div>
    </div>
  );
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Board;
