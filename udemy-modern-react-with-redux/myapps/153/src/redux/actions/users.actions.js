
import { HANDLE_USER, HANDLE_USERS } from '../constants';

import jsonPlaceHolder from '../../api/jsonPlaceHolder';

export const handleUser = (users) => ({
	type: HANDLE_USER,
	payload: users
});

export const handleUsers = (users) => ({
	type: HANDLE_USERS,
	payload: users
});

export const fetchUser = (userId) => async dispatch => {
	const response = await jsonPlaceHolder.get('/users', {
		params: { id: userId }
	});
	dispatch(handleUser(response.data));
};

export const fetchUsers = () => async dispatch => {
	const response = await jsonPlaceHolder.get('/users');
	dispatch(handleUsers(response.data));
};
