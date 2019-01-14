//

import React from 'react';
import PropTypes from 'prop-types';

const isSummer = (lat, month) => {
	if (month > 2 && month < 9) {
		return lat > 0;
	}
	return !lat > 0;
}

const seasonText = (summer) => {
	return summer ? "let's hit the beach" : 'Burr, it is chilly';
}

const SeasonDisplay = (props) => {
	const summer = isSummer(props.lat, (new Date().getMonth()));
	const text = seasonText(summer);
	return <h1>{text}</h1>
}

SeasonDisplay.propTypes = {
	lat: PropTypes.number.isRequired
};

export default SeasonDisplay;
