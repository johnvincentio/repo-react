
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const OpenIcon = (props) => {
	const { cssIcon, cssButton, onClick } = props;
	return (
		<button className={cssButton} onClick={onClick}>
			<Icon name="hamburger" cssIcon={cssIcon} />
		</button>
	);
};

OpenIcon.propTypes = {
	cssIcon: PropTypes.string.isRequired,
	cssButton: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default OpenIcon;
