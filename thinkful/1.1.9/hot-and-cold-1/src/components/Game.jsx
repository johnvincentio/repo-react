//

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import GuessList from './GuessList';

export const Outer = styled.section`
	position: relative;
	background-color: #394264;
	width: 380px;
	height: 380px;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	margin: 0 auto;

	box-shadow: rgb(26, 31, 52) 1px 1px, rgb(26, 31, 52) 2px 2px, rgb(26, 31, 52) 3px 3px,
		rgb(26, 31, 53) 4px 4px, rgb(26, 32, 53) 5px 5px, rgb(27, 32, 53) 6px 6px,
		rgb(27, 32, 54) 7px 7px, rgb(27, 32, 54) 8px 8px, rgb(27, 32, 54) 9px 9px,
		rgb(27, 33, 55) 10px 10px, rgb(27, 33, 55) 11px 11px, rgb(28, 33, 55) 12px 12px,
		rgb(28, 33, 56) 13px 13px, rgb(28, 34, 56) 14px 14px, rgb(28, 34, 56) 15px 15px,
		rgb(28, 34, 57) 16px 16px, rgb(29, 34, 57) 17px 17px, rgb(29, 34, 57) 18px 18px,
		rgb(29, 35, 58) 19px 19px, rgb(29, 35, 58) 20px 20px, rgb(29, 35, 58) 21px 21px,
		rgb(29, 35, 59) 22px 22px, rgb(30, 35, 59) 23px 23px, rgb(30, 36, 59) 24px 24px,
		rgb(30, 36, 60) 25px 25px, rgb(30, 36, 60) 26px 26px, rgb(30, 36, 60) 27px 27px,
		rgb(31, 37, 61) 28px 28px;
`;

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
		const guess = parseInt(input, 10);
		if (!Number.isNaN(guess)) {
			this.props.handleGuess(guess * 1);
			this.guessInput.value = '';
		}
	};

	render() {
		return (
			<Outer>
				<Title>{this.props.text}</Title>

				{!this.props.victory && (
					<form onSubmit={e => e.preventDefault()}>
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
						/>
						<Button onClick={this.handleGuess}>Guess</Button>
					</form>
				)}
				<p>Answer is {this.props.answer}</p>

				<Guess>
					Guess #<Count>{this.props.guesses.length}</Count>!
				</Guess>

				<GuessList guesses={this.props.guesses} />
			</Outer>
		);
	}
}

Game.propTypes = {
	handleGuess: PropTypes.func.isRequired,
	guesses: PropTypes.arrayOf(PropTypes.number).isRequired,
	answer: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	victory: PropTypes.bool.isRequired
};
