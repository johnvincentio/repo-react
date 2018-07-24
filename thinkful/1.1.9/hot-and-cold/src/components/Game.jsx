//

import React from 'react';
import PropTypes from 'prop-types';

export default function Game(props) {
	console.log('Game');
	return (
		<section className="game">
			<h2 id="feedback">Make your Guess!</h2>

			<form>
				<input
					type="text"
					name="userGuess"
					id="userGuess"
					className="text"
					maxLength="3"
					autoComplete="off"
					placeholder="Enter your Guess"
					required
				/>
				<input type="submit" id="guessButton" className="button" name="submit" value="Guess" />
			</form>

			<p>
				Guess #<span id="count">0</span>!
			</p>

			<ul id="guessList" className="guessBox clearfix" />
		</section>
	);
}

// Game.propTypes = {
// 	characters: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			name: PropTypes.string.isRequired,
// 			description: PropTypes.string.isRequired,
// 			actor: PropTypes.string.isRequired
// 		})
// 	).isRequired
// };
