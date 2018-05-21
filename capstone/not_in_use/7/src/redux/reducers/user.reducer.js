//

import { SIGNOUT_USER, SET_GOALS } from '../user.constants';

const initialState = {
	authenticated: false,
	goals: []
};

function user(state = initialState, action) {
	// console.log('--- user.reducer; action.type ', action.type);
	switch (action.type) {
		/*
		* User has been requested sign out
		*/
		case SIGNOUT_USER:
			console.log('user.reducer; SIGNOUT_USER, state ', state, ' action ', action);
			return { ...state, authenticated: false, goals: [] };
		/*
		* User goals data has been provided
		*/
		case SET_GOALS:
			console.log('user.reducer; SET_GOALS, state ', state, ' action ', action);
			return { ...state, authenticated: true, goals: action.payload };

		default:
			return state;
	}
}

export default user;
