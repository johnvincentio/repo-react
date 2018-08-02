//

import { SET_LANGUAGE } from '../actions';

const initialState = {
	language: 'en'
};

/* eslint-disable import/prefer-default-export */

// Add your code for the languageReducer
export const languageReducer = (state = initialState, action) => {
	if (action.type === SET_LANGUAGE) {
		return Object.assign({ language: action.language });
	}
	return state;
};
