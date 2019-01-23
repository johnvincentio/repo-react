
import { FETCH_USER, FETCH_USERS } from '../constants';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_USER:
			return Object.assign({}, state);
		case FETCH_USERS:
			return Object.assign({}, state);
		default:
			return state;
	}
};
