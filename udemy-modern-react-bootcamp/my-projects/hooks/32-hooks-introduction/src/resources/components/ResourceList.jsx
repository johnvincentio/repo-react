
import React from 'react';

import useResources from '../../hooks/useResources';

const ResourceList = ({ resource }) => {
	console.log('ResourceList; resource ', resource);
	const resources = useResources(resource);
	console.log('ResourceList; resources ', resources);
	return (
		<ul>
			{resources.map((record) => (
				<li key={record.id}>{record.title}</li>
			))}
		</ul>
	);
};

export default ResourceList;
