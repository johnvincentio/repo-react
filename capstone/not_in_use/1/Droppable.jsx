
import React from 'react';
import PropTypes from 'prop-types';

const Droppable = (props) => {
	// const dropId = { props };
	const dropid = "1234";
	return (
		<div
			className="droppable"
			data-drop-id={dropid}
		/>
	);
};

Droppable.propTypes = {
	// loggedin: PropTypes.bool.isRequired,
	// navOpen: PropTypes.bool,
};

Droppable.defaultProps = {
	// navOpen: true,
};

export default Droppable;

/*
			onDragEnter="dragEnterHandler(event)"
			onDragOver="dragoverHandler(event)"
			onDragLeave="dragLeaveHandler(event)"
			onDrop="dropHandler(event)"
*/
