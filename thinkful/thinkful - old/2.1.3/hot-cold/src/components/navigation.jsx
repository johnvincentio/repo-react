
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleHelp = this.handleHelp.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleHelp(event) {
    event.preventDefault();
    this.props.actions.handleHelp();
  }

  handleNewGame(event) {
    event.preventDefault();
    this.props.actions.handleNewGame();
  }

  render() {
    return (
      <header>
        <nav>
          <button type="button" onClick={this.handleHelp}>Help</button>
          <button type="button" onClick={this.handleNewGame}>New Game</button>
        </nav>
      </header>
    );
  }
}

Navigation.propTypes = {
  actions: PropTypes.shape({
    handleHelp: PropTypes.func,
    handleNewGame: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(Navigation);
