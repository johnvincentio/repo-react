
import {
	IS_SIDEBAR_OPEN,
	OPEN_SIDEBAR,
	CLOSE_SIDEBAR,
} from '../constants/action.types';

const initialState = {
	open: true,
};

function menu(state = initialState, action) {
	switch (action.type) {
		case IS_SIDEBAR_OPEN:
			return { open: state.open };
		case OPEN_SIDEBAR:
			return { open: true };
		case CLOSE_SIDEBAR:
			return { open: false };
		default:
			return state;
	}
}

export default menu;
