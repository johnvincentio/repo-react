//

/* eslint-disable import/prefer-default-export */

import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions';

const initialState = {
	items: []
};

export const crudReducer = (state = initialState, action) => {
	// console.log('--- crudReducer; state ', state, ' action ', action);
	if (action.type === ADD_ITEM) {
		return Object.assign({}, state, { items: [...state.items, action.item] });
	} else if (action.type === UPDATE_ITEM) {
		// const list = state.items.filter(item => item.id !== action.item.id);
		// return Object.assign({}, state, { items: [...list, action.item] });
		const list = state.items.map(item => (item.id === action.item.id ? action.item : item));
		return Object.assign({}, state, { items: list });
	} else if (action.type === DELETE_ITEM) {
		const list = state.items.filter(item => item.id !== action.item.id);
		return Object.assign({}, state, { items: list });
	}
	return state;
};
