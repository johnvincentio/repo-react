//

import React from 'react';
import PropTypes from 'prop-types';

import Platform from './Platform';
import Keyboard from './Keyboard';
import Word from './Word';

import { randomWord } from '../words/letter';

import {
	convertStringtoArrayObject, updateArrayObjectsForLetter,
	isLetterInArrayObjects, isArrayObjectsComplete,
	convertArrayObjectsToString
} from '../utils';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false
		};
	}

	componentDidMount() {
		this.handleOnNewgame();
	}

	handleOnNewgame = () => {
		const word = randomWord().toUpperCase();
		this.setState({
			currentWord: convertStringtoArrayObject(word),
			keyboard: convertStringtoArrayObject(`ABCDEFGHIJKLMNOPQRSTUVWXYZ`),
			gameWon: false,
			gameLost: false,
			guessesRemaining: this.props.maxGuesses,
			isReady: true
		});
	}

	handleOnKeyPressed = (letter) => {
		// console.log('Board::handleOnKeyPressed; letter ', letter);
		
		this.setState(prevState => {
			let remaining = prevState.guessesRemaining;
			if (remaining > 0 && (! isLetterInArrayObjects(prevState.currentWord, letter))) {
				// eslint-disable-next-line no-plusplus
				remaining--;
			}

			const updatedWord = updateArrayObjectsForLetter(prevState.currentWord, letter);

			const gameWon = isArrayObjectsComplete(updatedWord);
			const gameLost = remaining < 1;

			return {
				currentWord: updatedWord,
				keyboard: updateArrayObjectsForLetter(prevState.keyboard, letter),
				guessesRemaining: remaining,
				gameWon,
				gameLost
			}
		});
	}

	renderNewGameButton = () => {
		return (
			<div className="board--restart">
				<button type="button" className="board--restart-button" onClick={() => this.handleOnNewgame()}>
					Start New Game
				</button>
			</div>
		)
	}

	render() {
		// console.log('Board::render(); this.state ', this.state, ' this.props ', this.props);
		const { currentWord, keyboard, guessesRemaining, isReady, gameWon, gameLost } = this.state;
		if (! isReady) {
			return <div>Loading...</div>;
		}
		const strWord = convertArrayObjectsToString(currentWord);
		return (
			<div className="board">
				<div className="board--header">Play Hangman</div>

				{(gameWon || gameLost) ? (
					<div className="board--container">
						<div className="board--controls">
							<Platform guessesRemaining={guessesRemaining} />
						</div>
						<div className="board--controls">
							{gameWon ? (
								<div className="board--result victory">Congratulations on your VICTORY!!!</div>
							) : (
								<div className="board--result defeat">Defeated by the word: {strWord}</div>
							)
							}
							<Word currentWord={currentWord} />
							{this.renderNewGameButton()}
						</div>
					</div>
				) : (
					<div className="board--container">
						<div className="board--controls">
							<Platform guessesRemaining={guessesRemaining} />
							<div className="board--guesses">Guesses remaining: {guessesRemaining}</div>
							{/* <div>word: {strWord}</div> */}
						</div>
						<div className="board--controls">
							<Word currentWord={currentWord} />
							<Keyboard keyboard={keyboard} onKeyPressed={this.handleOnKeyPressed} />
							{this.renderNewGameButton()}
						</div>

					</div>		
				)
				}
			</div>
		);
	}
}

Board.propTypes = {
	maxGuesses: PropTypes.number
}

Board.defaultProps = {
	maxGuesses: 6
}

export default Board;
