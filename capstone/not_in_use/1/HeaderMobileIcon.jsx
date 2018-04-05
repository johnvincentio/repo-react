
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const HeaderMobileIcon = (props) => {
	const { navOpen, onClick } = props;
	return (
		<button className="header-nav-toggle" onClick={onClick}>
			{navOpen ?
				<Icon name="delete" css="close-menu" />
				: <Icon name="menu-button-of-three-horizontal-lines" css="open-menu" />}
		</button>
	);
};

HeaderMobileIcon.propTypes = {
	navOpen: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default HeaderMobileIcon;
