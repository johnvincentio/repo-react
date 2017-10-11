
import React from 'react';
// import { connect } from 'react-redux';

import GameNavigation from './game-navigation';

// eslint-disable-next-line import/no-named-as-default
import Board from './board';

// import * as actions from '../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class Game extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    //    this.addRepository = this.addRepository.bind(this);
  }


  render() {
//    const repositories = this.props.repositories.map((repository) => <Repository repository={repository} key={repository.name} />);

    return (
      <div className="outer">
        <GameNavigation />
        <Board />
      </div>
    );
  }
}

// const mapStateToProps = (state, props) => ({
//   repositories: state,
// });

// export default connect(mapStateToProps)(Game);

export default Game;

/*

//   addRepository() {
// //    const repositoryName = this.repositoryNameInput.value;
// //    this.props.dispatch(actions.addRepository(repositoryName));
//   }

return (
      <div className="repository-list">
        {repositories}
        <input type="text" ref={ref => this.repositoryNameInput = ref} />
        <button type="button" onClick={this.addRepository}>
          Add repository
        </button>
      </div>
    );
*/
