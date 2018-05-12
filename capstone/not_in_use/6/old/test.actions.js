//

import { userConstants } from '../user.constants';

import { userService } from '../services';

console.log('userConstants ', userConstants);

function request() {
	console.log('user.actions::request');
	return { type: userConstants.GETALL_REQUEST };
}
function success(users) {
	console.log('user.actions::success');
	return { type: userConstants.GETALL_SUCCESS, users };
}
function failure(error) {
	console.log('user.actions::failure');
	return { type: userConstants.GETALL_FAILURE, error };
}

function getAll() {
	console.log('user.actions::getAll');
	return dispatch => {
		dispatch(request());

		userService.getAll().then(users => dispatch(success(users)), error => dispatch(failure(error)));
	};
}

export const userActions = {
	getAll
};
