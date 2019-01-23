
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
	dispatch(handlePosts(response.data))
}

export const fetchPostsGOOD = () => async dispatch => {
	console.log('postsActions; fetchPosts');
	const response = await jsonPlaceHolder.get('/posts');
	console.log('response ', response);
	dispatch(handlePosts(response.data))
	// this.setState({
	// 	videos: response.data.items,
	// 	selectedVideo: response.data.items[0]
	// });
}

/*
	onSearchSubmit = async (term) => {
		const response = await youtube.get('/search', {
			params: { q: term }
		});
		console.log('response ', response);
		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0]
		});
	};

	export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};
*/
