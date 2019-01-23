
import { FETCH_USER, FETCH_USERS } from '../constants';

/* eslint-disable import/prefer-default-export */
export const fetchUser = () => ({
	type: FETCH_USER
});

export const fetchUsers = () => ({
	type: FETCH_USERS
});
