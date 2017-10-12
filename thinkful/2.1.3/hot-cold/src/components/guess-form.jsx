
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

export class GuessForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleGuess = this.handleGuess.bind(this);
  }

  handleGuess() {
    const input = this.guessInput.value;
    if (!Number.isNaN(input)) {
      const guess = parseInt(input, 10);
      this.props.actions.userGuessedNumber(guess);
    }
  }

  render() {
    return (
      <div>
        <div className="js--error-msg form-error" />
        <div>
          <input type="text" ref={ref => this.guessInput = ref} required />
          <button type="button" onClick={this.handleGuess}>
            Guess
          </button>
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
