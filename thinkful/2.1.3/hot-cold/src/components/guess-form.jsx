
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

export class GuessForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleGuess = this.handleGuess.bind(this);
  }

  handleGuess() {
    const guess = this.guessInput.value;
    console.log('handleGuess; guess '+guess);
    console.log(this.props);
    // actions.userGuessedNumber(actions.userGuessedNumber(guess));
    this.props.actions.userGuessedNumber(guess);
  }

  render() {
    return (
      <div>
        <div className="js--error-msg form-error" />
        <div>
          <input type="text" ref={ref => this.guessInput = ref} />
          <button type="button" onClick={this.handleGuess}>
            Guess
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  repositories: state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

// export default connect(mapStateToProps)(GuessForm);

export default connect(null, mapDispatchToProps)(GuessForm);


/*
<input
id="card"
name="card"
type="text"
required
placeholder="Enter your Guess"
onBlur={this.handleChange}
/>
*/
