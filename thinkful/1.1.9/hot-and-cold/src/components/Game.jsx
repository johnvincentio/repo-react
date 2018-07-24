//

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import GuessList from './GuessList';

export const Title = styled.h2`
	margin: 0 auto;
	background: #cc324b;
	padding: 1em 0.4em;
	font-size: 1.5em;
	font-weight: 400;
	display: block;
	line-height: 1em;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	color: #fff;
`;

export const Button2 = styled.button`
	color: #fff;
	cursor: pointer;
	border: 0;
	margin: 0;
	padding: 0;
	background: #1f253d;
	font-size: 1.2em;
`;

export const Button = styled.button`
	background: #1f253d;
	color: #95a5a6;
	font-size: 2em;
	padding: 0.2em;
	-webkit-transition: background 1s ease-in-out;
	-moz-transition: background 1s ease-in-out;
	-ms-transition: background 1s ease-in-out;
	-o-transition: background 1s ease-in-out;
	transition: background 1s ease-in-out;

	width: 300px;
	height: 50px;
	display: block;
	margin: 0.8em auto 0;
	// background: #50597b;
	// color: #fff;
	border: solid 1px #1f253d;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;

	&:hover {
		background: #e64c65;
		color: #fff;
		-webkit-transition: background 1s ease-in-out;
		-moz-transition: background 1s ease-in-out;
		-ms-transition: background 1s ease-in-out;
		-o-transition: background 1s ease-in-out;
		transition: background 1s ease-in-out;
		cursor: pointer;
	}
`;

export const Count = styled.span`
	color: #f39c12;
	font-weight: 700;
	font-size: 1.5em;
`;

export const Guess = styled.p`
	margin-top: 0.5em;
	font-size: 1.8em;
	padding-bottom: 0.5em;
`;

export default class Game extends React.Component {
	handleGuess = () => {
		const input = this.guessInput.value;
		console.log('handleGuess; input ', input);
		const guess = parseInt(input, 10);
		if (!Number.isNaN(guess)) {
			console.log('handleGuess; guess ', guess);
			this.props.handleGuess(guess * 1);
			this.guessInput.value = ' ';
		}
	};

	render() {
		console.log('Game::render(); guesses ', this.props.guesses);
		return (
			<section className="game">
				<Title id="feedback">{this.props.text}</Title>

				<form onSubmit={e => e.preventDefault()}>
					<input
						type="text"
						name="userGuess"
						id="userGuess"
						className="text"
						maxLength="3"
						autoComplete="off"
						placeholder="Enter your Guess"
						required
						ref={input => {
							this.guessInput = input;
						}}
					/>
					<Button onClick={this.handleGuess}>Guess</Button>
				</form>

				<p>Answer is {this.props.answer}</p>

				<Guess>
					Guess #<Count>{this.props.guesses.length}</Count>!
				</Guess>

				<GuessList guesses={this.props.guesses} />
			</section>
		);
	}
}

Game.propTypes = {
	handleGuess: PropTypes.func.isRequired,
	guesses: PropTypes.arrayOf(PropTypes.number).isRequired,
	answer: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired
};
