//

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

export default function GuessList(props) {
	console.log('GuessList::render(); guesses ', props.guesses);
	const characters = props.guesses.map((guess, index) => <li key={index}>{guess}</li>);
	return (
		<ul id="guessList" className="guessBox clearfix">
			{characters}
		</ul>
	);
}

GuessList.propTypes = {
	guesses: PropTypes.arrayOf(PropTypes.number).isRequired
};
