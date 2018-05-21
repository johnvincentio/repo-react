//

import { combineReducers } from 'redux';
// import { createResponsiveStateReducer } from 'redux-responsive';

import user from './user.reducer';

// import data from '../old/data.reducer';

const rootReducer = combineReducers({
	user
	// dataReducer: data
});

export default rootReducer;
