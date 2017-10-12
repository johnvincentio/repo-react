
import React from 'react';

// eslint-disable-next-line import/no-named-as-default
import GameNavigation from './game-navigation';

// eslint-disable-next-line import/no-named-as-default
import Board from './board';

// eslint-disable-next-line react/prefer-stateless-function
class Game extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    //    this.addRepository = this.addRepository.bind(this);
  }

  render() {
    return (
      <div className="outer">
        <GameNavigation />
        <Board />
      </div>
    );
  }
}

export default Game;
