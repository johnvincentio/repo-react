//

import { GET_MUSIC_DATA } from '../constants';

import MUSIC_DATA from '../music-data';

const initialState = MUSIC_DATA;

export default (state = initialState, action) => {
	switch (action.type) {
		// case FETCH_MUSIC_DATA:
		// 	console.log('FETCH_MUSIC_DATA; action.payload ', action.payload);
		// 	return Object.assign({}, state);
		case GET_MUSIC_DATA:
		default:
			return state;
	}
};
