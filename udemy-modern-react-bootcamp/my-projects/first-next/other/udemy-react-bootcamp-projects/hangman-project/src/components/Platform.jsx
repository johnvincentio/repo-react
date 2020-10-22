//

import React from 'react';
import PropTypes from 'prop-types';

const Platform = (props) => {
	const { guessesRemaining } = props;
	const img = guessesRemaining > 0 ? guessesRemaining : 0;
	const src = `images/${img}.jpg`;
	return (
		<div className="platform">
			<img src={src} alt={`Guesses remaining ${guessesRemaining}`} />
		</div>
	);
}

Platform.propTypes = {
	guessesRemaining: PropTypes.number.isRequired
}

export default Platform;
