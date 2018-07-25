//

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export const Outer = styled.ul`
	height: 80px;
	margin: 10px auto 0;
	background: #11a8ab;
	padding: 0.5em;
	display: block;
	line-height: 2em;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	color: #fff;
	overflow: auto;
`;

export const Inner = styled.li`
	display: inline;
	background-color: #1a4e95;
	padding: 0.3em;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	width: 95%;
	margin: 0.2em;
	color: #fff;
`;

export default function GuessList(props) {
	const characters = props.guesses.map((guess, index) => <Inner key={index}>{guess}</Inner>);
	return (
		<Outer id="guessList" className="guessBox clearfix">
			{characters}
		</Outer>
	);
}

GuessList.propTypes = {
	guesses: PropTypes.arrayOf(PropTypes.number).isRequired
};
