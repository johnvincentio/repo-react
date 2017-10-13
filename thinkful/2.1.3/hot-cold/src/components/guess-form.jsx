
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
      if (guess > 0 && guess < 100) {
        this.props.actions.userGuessedNumber(guess);
      }
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
        <div className="js--error-msg form-error" />
        <div>
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

/*
<button type="button" onClick={this.handleGuess}>
  Guess
</button>
*/
