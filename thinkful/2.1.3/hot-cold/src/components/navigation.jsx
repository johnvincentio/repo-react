
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame(event) {
    event.preventDefault();
    this.props.actions.handleNewGame();
  }

  render() {
    return (
      <nav>
        <ul>
          <li><a className="what" href="/">What?</a></li>
          <li><a className="new" href="/" onClick={this.handleNewGame}>New Game</a></li>
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  actions: PropTypes.shape({
    handleNewGame: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(Navigation);
