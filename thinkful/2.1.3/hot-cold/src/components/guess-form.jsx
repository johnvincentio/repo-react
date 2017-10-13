
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

export class GuessForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleGuess = this.handleGuess.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleGuess() {
    const input = this.guessInput.value;
    if (!Number.isNaN(input)) {
      const guess = parseInt(input, 10);
      this.props.actions.userGuessedNumber(guess);
      this.guessInput.value = '';
    }
  }

  handleKeyPress(event) {
    if (event.keyCode === 13 || event.which === 13) {
      this.handleGuess();
    }
  }

  render() {
    return (
      <div className="guess-form">
        <input
          type="text"
          className="guess-text"
          ref={(input) => { this.guessInput = input; }}
          required
          onKeyPress={this.handleKeyPress}
          placeholder="Enter your Guess"
          maxLength="3"
        />
      </div>
    );
  }
}

GuessForm.propTypes = {
  actions: PropTypes.shape({
    userGuessedNumber: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(GuessForm);
