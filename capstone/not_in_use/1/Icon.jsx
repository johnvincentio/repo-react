
import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../assets/icons.svg'; // Path to your icons.svg

const Icon = ({ name, color, size }) => (
	<svg className={`icon icon-${name}`} fill={color} width={size} height={size} aria-hidden="true">
		<use xlinkHref={`${Icons}#icon-${name}`} />
	</svg>
);

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.number,
};

Icon.defaultProps = {
	color: '#000000',
	size: 100,
};

export default Icon;
