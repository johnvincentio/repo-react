import React from 'react';
import PropTypes from 'prop-types';

import './character-count.css';

export default function CharacterCount(props) {
	return (
		<span
			aria-live="assertive"
			aria-atomic="true"
			id="character-count"
			className="character-count"
			role="status"
		>
			{props.count} characters
		</span>
	);
}

CharacterCount.propTypes = {
	count: PropTypes.number.isRequired
};
