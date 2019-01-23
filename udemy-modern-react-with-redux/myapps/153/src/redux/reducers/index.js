
import { combineReducers } from 'redux';

import postsReducer from './posts.reducer';
import usersReducer from './users.reducer';

const rootReducer = combineReducers({
	postsReducer,
	usersReducer
});

export default rootReducer;
