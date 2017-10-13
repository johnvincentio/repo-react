
import React from 'react';

// eslint-disable-next-line import/no-named-as-default
import Help from './help';

// eslint-disable-next-line import/no-named-as-default
import Navigation from './navigation';

// eslint-disable-next-line import/no-named-as-default
import Board from './board';

function Game() {
  return (
    <div className="game">
      <Help />
      <Navigation />
      <Board />
    </div>
  );
}

export default Game;
