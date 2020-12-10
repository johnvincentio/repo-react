import { useState, useEffect } from 'react';

import axios from 'axios';

const useResources = (resource) => {
	console.log('useResources; resource ', resource);
	const [resources, setResources] = useState([]);

	useEffect(() => {
		(async (resource) => {
			console.log('in useEffect; resource ', resource);
			const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
			setResources(response.data);
		})(resource);
	}, [resource]);

	return resources;
};

export default useResources;
