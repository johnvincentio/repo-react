//

import React from 'react';
import PropTypes from 'prop-types';

import Feedback from './Feedback';
import GuessForm from './GuessForm';
import GuessList from './GuessList';
import Status from './Status';

import './game.scss';

const Game = props => (
	<main className="game">
		<Feedback feedback={props.text} />

		<GuessForm
			handleGuess={value => props.handleGuess(value)}
			answer={props.answer}
			victory={props.victory}
		/>

		<Status count={props.guesses.length} />

		<GuessList guesses={props.guesses} />
	</main>
);

Game.propTypes = {
	handleGuess: PropTypes.func.isRequired,
	guesses: PropTypes.arrayOf(PropTypes.number).isRequired,
	answer: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	victory: PropTypes.bool.isRequired
};

export default Game;
