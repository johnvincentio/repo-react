
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const MovableItem = ({ name, index }) => {

	console.log('in MovableItem');

	return (
		<div className='movable-item'>{name}</div>
	);
};

MovableItem.propTypes = {
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

export default MovableItem;
