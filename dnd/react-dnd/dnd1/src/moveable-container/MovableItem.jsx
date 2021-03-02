
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const MovableList = ({ name, index }) => {

	console.log('in MovableList');

	return (
		<div className='movable-item'>{name}</div>
	);
};

export default MovableList;
