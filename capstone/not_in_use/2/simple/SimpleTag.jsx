
import React from 'react';
import PropTypes from 'prop-types';

const SimpleTag = (props) => {
	const { tag } = props;
	// console.log('--- SimpleTag, tag ', tag);
	return (
		<div>
			--------- {tag}
		</div>
	);
};

SimpleTag.propTypes = {
	tag: PropTypes.string.isRequired,
};

export default SimpleTag;
