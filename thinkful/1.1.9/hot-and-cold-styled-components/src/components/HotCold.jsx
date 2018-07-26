//

import React from 'react';

import Game from './Game';
import Help from './Help';
import Navigation from './Navigation';

import Utils from '../utils';

export default class HotCold extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			guesses: [],
			answer: this.randomInteger(1, 100),
			showHelp: false,
			text: 'Make your Guess!',
			victory: false
		};
	}

	randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	initGame() {
		this.setState({
			guesses: [],
			answer: this.randomInteger(1, 100),
			showHelp: false,
			text: 'Make your Guess!',
			victory: false
		});
	}
	toggleHelp() {
		this.setState({ showHelp: !this.state.showHelp });
	}

	toggleGame() {
		this.initGame();
	}

	handleGuess(value) {
		if (this.state.guesses.findIndex(item => item === value) === -1) {
			const text = Utils.handleComment(value, this.state.answer);
			const arr = JSON.parse(JSON.stringify(this.state.guesses));
			const victory = Math.abs(value - this.state.answer) === 0;
			arr.push(value);
			this.setState({ guesses: arr, text, victory });
		}
	}

	render() {
		return (
			<div>
				{!this.state.showHelp && (
					<Navigation toggleHelp={() => this.toggleHelp()} toggleGame={() => this.toggleGame()} />
				)}
				{this.state.showHelp && <Help toggleHelp={() => this.toggleHelp()} />}
				{!this.state.showHelp && (
					<Game
						handleGuess={value => this.handleGuess(value)}
						guesses={this.state.guesses}
						answer={this.state.answer}
						text={this.state.text}
						victory={this.state.victory}
					/>
				)}
			</div>
		);
	}
}
