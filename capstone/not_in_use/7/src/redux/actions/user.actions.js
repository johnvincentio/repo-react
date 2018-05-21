//

import fetch from 'isomorphic-fetch';

import { SET_GOALS, SIGNOUT_USER } from '../user.constants';

// const ROOT_URL = 'http://localhost:3090';

/*
* User has requested a signout
*/
export function signoutUser() {
	console.log('user.actions::signoutUser');
	localStorage.removeItem('token');
	return { type: SIGNOUT_USER };
}

/*
* Set user goals into store
*/
export function handleGoals(data) {
	console.log('user.actions::handleGoals, data ', data);
	return {
		type: SET_GOALS,
		payload: data
	};
}

export function getNoTokenHeader() {
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8'
	};
}

export function getTokenHeader() {
	const token = localStorage.getItem('token');
	if (token) {
		console.log('*** found a token');
		return {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		};
	}
	return getNoTokenHeader();
}

export function createData(body) {
	const headers = getTokenHeader();
	console.log('createData, headers ', headers);
	const data = {
		headers,
		method: 'POST',
		body: JSON.stringify(body)
	};
	console.log('createData, data ', data);
	return data;
}

export function handleFetch(dispatch, url, data) {
	console.log('user.actions:: handleFetch, url ', url, ' data ', data);
	return fetch(url, data)
		.then(response => {
			// prettier-ignore
			console.log('handleFetch, response.ok ', response.ok, ' response.status ', response.status, 
				' response.statusText ', response.statusText);
			if ((response.status >= 200 && response.status < 300) || response.status === 400) {
				return response.json();
			}
			console.log('handleFetch, response.statusText ', response.statusText);
			throw new Error('Unable to access the server, please try again later.');
			// return Promise.reject(new Error('Unable to access the server, please try again later.'));
		})
		.then(json => {
			console.log('handleFetch, json ', json);
			if (json.message) {
				console.log('handleFetch, error condition, message found ', json.message);
				throw new Error(json.message);
				// return Promise.reject(new Error(json.message));
			}
			if (json.token) {
				console.log('handleFetch, token found ');
				localStorage.setItem('token', json.token);
			}
			if (json.goals) {
				console.log('handleFetch, goals found ');
				dispatch(handleGoals(json.goals));
			}
		});
}

/*
* User has requested a Signin
*/
export const signinUser = ({ email, password, remember }) => dispatch => {
	const data = createData({
		email,
		password,
		remember
	});
	return handleFetch(dispatch, '/api/auth/login', data);
};

/*
* User has requested a Google Signin
*/
export const signinGoogleUser = body => dispatch => handleFetch(dispatch, `/api/auth/login/google`, createData(body));

/*
* User has requested a password reset
*/
export const resetPassword = body => dispatch => handleFetch(dispatch, `/api/reset/request`, createData(body));

/*
* User has used reset password link from the email
*/
export const verifyChangePassword = body => dispatch => handleFetch(dispatch, `/api/reset/update`, createData(body));

/*
* User has changed password
*/
export const verifyChangedPassword = body => dispatch => handleFetch(dispatch, `/api/reset/changed`, createData(body));

/*
* User has requested to register
*/
export const registerUser = ({ email, password }) => dispatch => {
	const data = createData({
		email,
		password
	});
	return handleFetch(dispatch, '/api/register/join', data);
};

/*
* User has attempted to confirm registration
*/
export const verifyRegisterUser = body => dispatch =>
	handleFetch(dispatch, `/api/register/${body.registerId}/${body.otherId}`, createData(body));

/*
* User has requested Contact
*/
export const contactMessage = body => dispatch => handleFetch(dispatch, `/api/contact/message`, createData(body));

/*
* Search all goals data
*/
export const searchUserData = query => dispatch => {
	const data = createData({
		query
	});
	return handleFetch(dispatch, '/api/search', data);
};

/*
* Move user object
*/
export const moveUserObject = (from, to, insertBefore) => dispatch => {
	console.log('goal.actions:: moveUserObject, from ', from, ' to ', to, ' insertBefore ', insertBefore);
	const data = createData({
		from,
		to,
		insertBefore
	});
	return handleFetch(dispatch, '/api/goals/move', data);
};

/*
* handle goals
*/

/*
* Add goal
*/
export const addGoal = goal => dispatch => {
	const data = createData({
		title: goal.title,
		description: goal.description,
		status: goal.status
	});
	return handleFetch(dispatch, '/api/goals/add', data);
};

/*
* Update goal
*/
export const updateGoal = (goalid, update) => dispatch => {
	console.log('goal.actions:: updateGoal, goalid ', goalid, ' update ', update);
	const data = createData({
		goalid,
		title: update.title,
		description: update.description,
		status: update.status
	});
	return handleFetch(dispatch, '/api/goals/update', data);
};

/*
* Clone goal
*/
export const cloneGoal = goalid => dispatch => {
	const data = createData({
		goalid
	});
	return handleFetch(dispatch, '/api/goals/clone', data);
};

/*
* Delete goal
*/
export const deleteGoal = goalid => dispatch => {
	const data = createData({
		goalid
	});
	return handleFetch(dispatch, '/api/goals/delete', data);
};

/*
* handle projects
*/

/*
* Add project
*/
export const addProject = (goalid, project) => dispatch => {
	const data = createData({
		goalid,
		title: project.title,
		description: project.description,
		status: project.status
	});
	handleFetch(dispatch, '/api/projects/add', data);
};

/*
* Clone project
*/
export const cloneProject = (goalid, projectid) => dispatch => {
	const data = createData({
		goalid,
		projectid
	});
	return handleFetch(dispatch, '/api/projects/clone', data);
};

/*
* Delete project
*/
export const deleteProject = (goalid, projectid) => dispatch => {
	const data = createData({
		goalid,
		projectid
	});
	return handleFetch(dispatch, '/api/projects/delete', data);
};

/*
* Update project
*/
export const updateProject = (goalid, projectid, update) => dispatch => {
	const data = createData({
		goalid,
		projectid,
		title: update.title,
		description: update.description,
		status: update.status
	});
	return handleFetch(dispatch, '/api/projects/update', data);
};

/*
* handle tasks
*/

/*
* Add task
*/
export const addTask = (goalid, projectid, task) => dispatch => {
	const data = createData({
		goalid,
		projectid,
		title: task.title,
		description: task.description,
		status: task.status,
		starred: task.starred,
		tags: task.tags,
		repeat: task.repeat,
		interval: task.interval,
		estimate: task.estimate,
		actual: task.actual,
		start: task.start,
		end: task.end
	});
	return handleFetch(dispatch, '/api/tasks/add', data);
};

/*
* Clone task
*/
export const cloneTask = (goalid, projectid, taskid) => dispatch => {
	const data = createData({
		goalid,
		projectid,
		taskid
	});
	return handleFetch(dispatch, '/api/tasks/clone', data);
};

/*
* Delete task
*/
export const deleteTask = (goalid, projectid, taskid) => dispatch => {
	const data = createData({
		goalid,
		projectid,
		taskid
	});
	return handleFetch(dispatch, '/api/tasks/delete', data);
};

/*
* Update task
*/
export const updateTask = (goalid, projectid, taskid, task) => dispatch => {
	// prettier-ignore
	// console.log('goal.actions::updateTask, goalid ', goalid, ' projectid ', projectid,
	// 	' taskid ', taskid, ' task ', task);

	const data = createData({
		goalid,
		projectid,
		taskid,
		title: task.title,
		description: task.description,
		status: task.status,
		starred: task.starred,
		tags: task.tags,
		repeat: task.repeat,
		interval: task.interval,
		estimate: task.estimate,
		actual: task.actual,
		start: task.start,
		end: task.end
	});
	return handleFetch(dispatch, '/api/tasks/update/task', data);
};

export const updateDatesTask = (goalid, projectid, taskid, start, end) => dispatch => {
	const data = createData({
		goalid,
		projectid,
		taskid,
		start,
		end
	});
	return handleFetch(dispatch, '/api/tasks/update/dates', data);
};

/*
* General fetch
*/
// export function handleOldFetch(dispatch, url, data) {
// 	console.log('goal.actions:: handleOldFetch, url ', url, ' data ', data);
// 	fetch(url, data)
// 		.then(response => {
// 			console.log('response.ok ', response.ok);
// 			console.log('response.status ', response.status);
// 			if ((response.status >= 200 && response.status < 300) || response.status === 400) {
// 				return response.json();
// 			}
// 			const error = new Error(response.statusText);
// 			error.response = response;
// 			throw error;
// 		})
// 		.then(success => {
// 			console.log('goal.actions:: handleFetch; success ', success);
// 			if (success.message) {
// 				console.log('goal.actions:: handleFetch; message found ', success.message);
// 				dispatch(handleError(success.message));
// 			} else if (success.goals) {
// 				console.log('goal.actions:: handleFetch; goals found ', success.goals);
// 				dispatch(handleGoals(success.goals));
// 			}
// 		})
// 		.catch(error => {
// 			dispatch(handleError(error.response.statusText));
// 		});
// }

// function handleResponse(response) {
// 	if (!response.ok) {
// 		return Promise.reject(response.statusText);
// 	}

// 	return response.json();
// }

// function getAll() {
// 	const requestOptions = {
// 		method: 'GET',
// 		headers: authGetHeader()
// 	};
// 	console.log('getAll:requestOptions ', requestOptions);

// 	return fetch('/api/goals/all', requestOptions).then(handleResponse);
// }

// export function signinUser({ email, password }) {
// 	return function(dispatch) {
// 		// Submit email/password to the server
// 		axios
// 			.post(`${ROOT_URL}/signin`, { email, password })
// 			.then(response => {
// 				// If request is good...
// 				// - Update state to indicate user is authenticated
// 				dispatch({ type: AUTH_USER });
// 				// - Save the JWT token
// 				localStorage.setItem('token', response.data.token);
// 				// - redirect to the route '/feature'
// 				browserHistory.push('/feature');
// 			})
// 			.catch(() => {
// 				// If request is bad...
// 				// - Show an error to the user
// 				dispatch(authError('Bad Login Info'));
// 			});
// 	};
// }

// export function signupUser({ email, password }) {
// 	return function(dispatch) {
// 		axios
// 			.post(`${ROOT_URL}/signup`, { email, password })
// 			.then(response => {
// 				dispatch({ type: AUTH_USER });
// 				localStorage.setItem('token', response.data.token);
// 				browserHistory.push('/feature');
// 			})
// 			.catch(response => dispatch(authError(response.data.error)));
// 	};
// }

// export function fetchMessage() {
// 	return function(dispatch) {
// 		axios
// 			.get(ROOT_URL, {
// 				headers: { authorization: localStorage.getItem('token') }
// 			})
// 			.then(response => {
// 				dispatch({
// 					type: FETCH_MESSAGE,
// 					payload: response.data.message
// 				});
// 			});
// 	};
// }
