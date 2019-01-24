
import { HANDLE_POSTS } from '../constants';

export default (state = [], action) => {
	console.log('PostsReducer; type ', action.type, ' payload ', action.payload);
	switch (action.type) {
		case HANDLE_POSTS:
			return { ...state, posts: action.payload };
		default:
			return state;
	}
};
