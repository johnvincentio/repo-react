
import React from 'react';

// eslint-disable-next-line import/no-named-as-default
import GameNavigation from './game-navigation';

// eslint-disable-next-line import/no-named-as-default
import Board from './board';

function Game() {
  return (
    <div className="outer">
      <GameNavigation />
      <Board />
    </div>
  );
}

export default Game;
