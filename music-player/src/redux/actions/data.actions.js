//

import jsondata from '../../apis/jsonPlaceHolder';

import { FETCH_MUSIC_DATA, GET_MUSIC_DATA } from '../constants';

/* eslint-disable import/prefer-default-export */

export const fetchMusicData = () => async dispatch => {
	console.log('---data.actions; fetchMusicData');
	const response = await jsondata.get('./music-data.json', { crossDomain: true });
	console.log('---data.actions; response ', response);
	dispatch({ type: FETCH_MUSIC_DATA, payload: response.data });
};

export const getMusicData = () => {
	console.log('---data.actions; getMusicData');
	return { type: GET_MUSIC_DATA };
};
