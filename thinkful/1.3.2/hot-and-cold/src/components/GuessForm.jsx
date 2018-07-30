//

import React from 'react';
import PropTypes from 'prop-types';

import './guessForm.scss';

export default class GuessForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAnswer: false
		};
	}

	handleGuess = () => {
		const input = this.guessInput.value;
		if (input === '?') {
			this.toggleAnswer();
			return;
		}

		const guess = parseInt(input, 10);
		if (!Number.isNaN(guess)) {
			this.props.handleGuess(guess * 1);
		}
		this.guessInput.value = '';
	};

	toggleAnswer() {
		this.setState({ showAnswer: !this.state.showAnswer });
	}

	render() {
		return (
			<div>
				{!this.props.victory && (
					<form className="guessForm" onSubmit={e => e.preventDefault()}>
						<input
							type="text"
							name="userGuess"
							id="userGuess"
							className="text"
							maxLength="3"
							autoComplete="off"
							placeholder="Enter your Guess"
							ref={input => {
								this.guessInput = input;
							}}
							autoFocus
						/>
						<button onClick={this.handleGuess}>Guess</button>
					</form>
				)}
				{this.state.showAnswer && <p>Answer is {this.props.answer}</p>}
			</div>
		);
	}
}

GuessForm.propTypes = {
	handleGuess: PropTypes.func.isRequired,
	answer: PropTypes.number.isRequired,
	victory: PropTypes.bool.isRequired
};
