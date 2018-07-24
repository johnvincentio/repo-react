//

import React from 'react';

import Game from './Game';
import Help from './Help';
import Navigation from './Navigation';

export default class HotCold extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			guesses: [12, 67],
			showHelp: false,
			answer: this.randomInteger(1, 100)
		};
	}

	randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	initGame() {
		this.setState({ guesses: [], answer: this.randomInteger(1, 100), showHelp: false });
	}
	toggleHelp() {
		this.setState({ showHelp: !this.state.showHelp });
	}

	toggleGame() {
		this.initGame();
	}

	handleGuess(value) {
		console.log('handleGuess; value ', value);
		const arr = JSON.parse(JSON.stringify(this.state.guesses));
		arr.push(value);
		// const arr = { ...this.state.guesses, value };
		this.setState({ guesses: arr });
	}

	render() {
		console.log('HotCold::render(); state ', this.state);
		return (
			<div className="hot-cold">
				{!this.state.showHelp && (
					<Navigation toggleHelp={() => this.toggleHelp()} toggleGame={() => this.toggleGame()} />
				)}
				{this.state.showHelp && <Help toggleHelp={() => this.toggleHelp()} />}
				{!this.state.showHelp && (
					<Game
						handleGuess={value => this.handleGuess(value)}
						guesses={this.state.guesses}
						answer={this.state.answer}
					/>
				)}
			</div>
		);
	}
}
