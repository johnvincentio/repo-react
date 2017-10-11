
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
    const input = this.guessInput.value;
    console.log(input);
    if (! isNaN(input)) {
      const guess = parseInt(input, 10);
      console.log(guess);
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

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
