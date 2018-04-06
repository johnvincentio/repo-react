import { IS_GRID, TOGGLE_GRID } from '../constants/action.types';

export const isGrid = () => ({
	type: IS_GRID
});

export const toggleGrid = () => ({
	type: TOGGLE_GRID
});
