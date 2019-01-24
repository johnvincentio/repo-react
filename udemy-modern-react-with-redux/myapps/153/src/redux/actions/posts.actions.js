
import { FETCH_POSTS, HANDLE_POSTS } from '../constants';

import jsonPlaceHolder from '../../api/jsonPlaceHolder';

export const handlePosts = (posts) => ({
	type: HANDLE_POSTS,
	payload: posts
});

export const fetchPosts = () => async dispatch => {
	console.log('postsActions; fetchPosts');
	const response = await jsonPlaceHolder.get('/posts');
	console.log('response ', response);
	dispatch(handlePosts(response.data));
};

export const fetchPostsGOOD1 = () => {
	return async function (dispatch, getState) {
		const response = await jsonPlaceHolder.get('/posts');
		dispatch(handlePosts(response.data));
	};
};

export const fetchPostsGOOD2 = () => {
	return async (dispatch) => {
		const response = await jsonPlaceHolder.get('/posts');
		dispatch(handlePosts(response.data));
	};
};

export const fetchPostsGOOD3 = () => async dispatch => {
	const response = await jsonPlaceHolder.get('/posts');
	dispatch(handlePosts(response.data));
};
