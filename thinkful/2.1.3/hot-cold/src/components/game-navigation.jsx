
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

export class GameNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    this.props.actions.handleNewGame();
  }

  render() {
    return (
      <nav>
        <ul>
          <li><a className="what" href="#">What?</a></li>
          <button type="button" onClick={this.handleNewGame}>
            New Game
          </button>
          <li><a className="new" href="#" onClick={this.handleNewGame}>New Game</a></li>
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(GameNavigation);
