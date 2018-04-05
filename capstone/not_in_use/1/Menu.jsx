import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint max-len: [2, 900, 4] */ // maximum length of 900 characters
function Menu(props) {
	return (
		<svg id="menu-button-of-three-horizontal-lines" viewBox="0 0 124 124" className={props.css} aria-hidden="true">
			<title>menu-button-of-three-horizontal-lines</title>
			<path d="M112,6H12C5.4,6,0,11.4,0,18s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,6,112,6z" />
			<path d="M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z" />
			<path d="M112,94H12c-6.6,0-12,5.4-12,12s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,94,112,94z" />
		</svg>
	);
}

Menu.propTypes = {
	css: PropTypes.string.isRequired,
};

export default connect(null)(Menu);

/*
className="open-menu"
*/
