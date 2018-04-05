
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const HeaderIcon = (props) => {
	const { navOpen, onClick } = props;
	return (
		<button className="header-icon" onClick={onClick}>
			{navOpen ?
				<Icon name="cancel" css="close-menu" />
				: <Icon name="hamburger" css="open-menu" />}
		</button>
	);
};

HeaderIcon.propTypes = {
	navOpen: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default HeaderIcon;
