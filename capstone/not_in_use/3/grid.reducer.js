import { IS_GRID, TOGGLE_GRID } from '../constants/action.types';

const initialState = {
	grid: true
};

function grid(state = initialState, action) {
	switch (action.type) {
		case IS_GRID:
			return { grid: state.grid };
		case TOGGLE_GRID:
			return { grid: !state.grid };
		default:
			return state;
	}
}

export default grid;
