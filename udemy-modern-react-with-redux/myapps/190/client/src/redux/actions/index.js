
import streams from '../../apis/streams';

import { SIGN_IN, SIGN_OUT } from '../constants';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
}

export const signOut = () => {
	return {
		type: SIGN_OUT
	};
}

export const createStream = (formValues) => async dispatch => {
	console.log('action:: createStream, formValues ', formValues)
	streams.post('./streams', formValues);
}