//

import { userConstants } from '../user.constants';

const initialState = { goals: [] };

function user(state = initialState, action) {
	console.log('--- user.reducer; action.type ', action.type);
	switch (action.type) {
		case userConstants.GETALL_REQUEST:
			console.log('user.reducer; userConstants.GETALL_REQUEST, state ', state, ' action ', action);
			return Object.assign({}, state, { loading: true, goals: [] });
		// return {
		// 	loading: true,
		// 	goals: []
		// };
		case userConstants.GETALL_SUCCESS:
			console.log('user.reducer; userConstants.GETALL_SUCCESS, state ', state, ' action ', action);
			return Object.assign({}, state, { goals: action.users.goals });
		// return {
		// 	goals: action.users.goals
		// };
		case userConstants.GETALL_FAILURE:
			console.log('user.reducer; userConstants.GETALL_FAILURE, state ', state, ' action ', action);
			return {
				error: action.error,
				goals: []
			};
		default:
			return state;
	}
}

export default user;

/*
return Object.assign({}, state, { goals: state.goals.concat(newitem) });
*/
