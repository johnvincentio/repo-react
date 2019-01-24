
import { HANDLE_USERS } from '../constants';

import jsonPlaceHolder from '../../api/jsonPlaceHolder';

export const handleUsers = (users) => ({
	type: HANDLE_USERS,
	payload: users
});

export const fetchUsers = () => async dispatch => {
	// console.log('usersActions; fetchUsers');
	const response = await jsonPlaceHolder.get('/users');
	// console.log('response ', response);
	dispatch(handleUsers(response.data));
};
