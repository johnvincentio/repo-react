
import { HANDLE_USERS } from '../constants';

export default (state = [], action) => {
	// console.log('UsersReducer; type ', action.type, ' payload ', action.payload);
	switch (action.type) {
		case HANDLE_USERS:
			return { ...state, users: action.payload };
		default:
			return state;
	}
};
