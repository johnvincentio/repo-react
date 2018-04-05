
import React from 'react';

import { tagsType } from '../../types';
import SimpleTag from './SimpleTag';

const SimpleTags = (props) => {
	const { tags } = props;
	// console.log('--- SimpleTags, tags ', tags);
	const div = tags.map(tag => (
		<div key={`tag-${tag}`}>
			<SimpleTag tag={tag} />
		</div>
	));
	return (
		<div>
			{ div }
		</div>
	);
};

SimpleTags.propTypes = {
	tags: tagsType.isRequired,
};

export default SimpleTags;

