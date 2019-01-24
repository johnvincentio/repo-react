
import { HANDLE_POSTS } from '../constants';

import { fetchUser } from './users.actions';

import jsonPlaceHolder from '../../api/jsonPlaceHolder';

export const handlePosts = (posts) => ({
	type: HANDLE_POSTS,
	payload: posts
});

export const fetchPostsAndUsers = () => async dispatch => {
	const response = await jsonPlaceHolder.get('/posts');

	const userList = [];
	response.data.forEach(post => {
		if (userList.findIndex(user => user === post.userId) === -1) {
			userList.push(post.userId);
		}
	})
	userList.forEach(user => {
		dispatch(fetchUser(user));
	})

	dispatch(handlePosts(response.data));
};



// export const fetchPostsGOOD1 = () => {
// 	return async function (dispatch, getState) {
// 		const response = await jsonPlaceHolder.get('/posts');
// 		dispatch(handlePosts(response.data));
// 	};
// };

// export const fetchPostsGOOD2 = () => {
// 	return async (dispatch) => {
// 		const response = await jsonPlaceHolder.get('/posts');
// 		dispatch(handlePosts(response.data));
// 	};
// };

// export const fetchPostsGOOD3 = () => async dispatch => {
// 	const response = await jsonPlaceHolder.get('/posts');
// 	dispatch(handlePosts(response.data));
// };
