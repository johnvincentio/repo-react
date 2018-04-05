
import React from 'react';
import PropTypes from 'prop-types';

const HeaderNav = (props) => {
	const { loggedin, navOpen } = props;
	const navItem = loggedin ? <a href="/">Sign Out</a> : <a href="/login">Sign In</a>;
	if (navOpen) {
		return (
			<nav>
				<ul>
					<li><a href="/">Nav Item</a></li>
					<li>{ navItem }</li>
				</ul>
			</nav>
		);
	}
	return '';
};

HeaderNav.propTypes = {
	loggedin: PropTypes.bool.isRequired,
	navOpen: PropTypes.bool,
};

HeaderNav.defaultProps = {
	navOpen: true,
};

export default HeaderNav;
