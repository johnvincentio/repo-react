//

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const seasonConfig = {
	summer: {
		season: 'summer',
		text: "Let's hit the beach!",
		icon: 'sun'
	},
	winter: {
		season: 'winter',
		text: 'Burr, it is chilly',
		icon: 'snowflake'
	}
}
const isSummer = (lat, month) => {
	if (month > 2 && month < 9) {
		return lat > 0;
	}
	return !lat > 0;
}

const SeasonDisplay = (props) => {
	const summer = isSummer(props.lat, (new Date().getMonth()));
	const obj = summer ? seasonConfig.summer : seasonConfig.winter;
	return (
		<div className={`season-display ${obj.season}`}>
			<i className={`icon-left ${obj.icon} icon massive`} />
			<h1>{obj.text}</h1>
			<i className={`icon-right ${obj.icon} icon massive`} />
		</div>
	)
}

SeasonDisplay.propTypes = {
	lat: PropTypes.number.isRequired
};

export default SeasonDisplay;
