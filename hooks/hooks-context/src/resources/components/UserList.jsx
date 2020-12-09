import React from 'react';

import useResources from '../../hooks/useResources';

const UserList = () => {
	const users = useResources('users');
	console.log('UserList; users ', users);

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
};

export default UserList;
