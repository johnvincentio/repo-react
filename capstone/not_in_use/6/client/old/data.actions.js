import {
	GET_USER_DATA,
	SEARCH_USER_DATA,
	MOVE_USER_OBJECT,
	ADD_USER_GOAL,
	DELETE_USER_GOAL,
	CLONE_USER_GOAL,
	UPDATE_USER_GOAL,
	ADD_USER_PROJECT,
	DELETE_USER_PROJECT,
	CLONE_USER_PROJECT,
	UPDATE_USER_PROJECT,
	ADD_USER_TASK,
	DELETE_USER_TASK,
	MOVE_USER_TASK_PROJECT,
	CLONE_USER_TASK,
	UPDATE_USER_TASK,
	UPDATE_USER_DATE_TASK,
	UPDATE_USER_DATES_TASK,
	ADD_USER_TASK_TAG,
	DELETE_USER_TASK_TAG,
	MOVE_USER_TASK_TAG
} from './action.types';

/*
* Handle all user data
*/
export const getUserData = () => ({
	type: GET_USER_DATA
});

/*
* Handle search user data
*/
export const searchUserData = search => ({
	type: SEARCH_USER_DATA,
	search
});

/*
* Handle moving user object to a different object
*/
export const moveUserObject = (from, to, before) => ({
	type: MOVE_USER_OBJECT,
	from,
	to,
	before
});

/*
export const moveUserProject = (from, to, before) => ({
	type: MOVE_USER_PROJECT,
	from,
	to,
	before,
});

export const moveUserTask = (drag, drop) => ({
	type: MOVE_USER_TASK,
	drag,
	drop,
});
*/

/*
* Handle all user goal functions
*/
export const addUserGoal = goal => ({
	type: ADD_USER_GOAL,
	goal
});

export const deleteUserGoal = goalId => ({
	type: DELETE_USER_GOAL,
	goalId
});

export const cloneUserGoal = goalId => ({
	type: CLONE_USER_GOAL,
	goalId
});

export const updateUserGoal = (goalId, update) => ({
	type: UPDATE_USER_GOAL,
	goalId,
	update
});

/*
* Handle all user project functions
*/
export const addUserProject = (goalId, project) => ({
	type: ADD_USER_PROJECT,
	goalId,
	project
});

export const deleteUserProject = (goalId, projectId) => ({
	type: DELETE_USER_PROJECT,
	goalId,
	projectId
});

export const cloneUserProject = (goalId, projectId) => ({
	type: CLONE_USER_PROJECT,
	goalId,
	projectId
});

export const updateUserProject = (goalId, projectId, update) => ({
	type: UPDATE_USER_PROJECT,
	goalId,
	projectId,
	update
});

/*
* Handle all user task functions
*/
export const addUserTask = (goalId, projectId, task) => ({
	type: ADD_USER_TASK,
	goalId,
	projectId,
	task
});

export const deleteUserTask = (goalId, projectId, taskId) => ({
	type: DELETE_USER_TASK,
	goalId,
	projectId,
	taskId
});

export const moveUserTaskProject = (from, to) => ({
	type: MOVE_USER_TASK_PROJECT,
	from,
	to
});

export const cloneUserTask = (goalId, projectId, taskId) => ({
	type: CLONE_USER_TASK,
	goalId,
	projectId,
	taskId
});

export const updateUserTask = (goalId, projectId, taskId, task) => ({
	type: UPDATE_USER_TASK,
	goalId,
	projectId,
	taskId,
	task
});

export const updateUserDateTask = (goalId, projectId, taskId, update) => ({
	type: UPDATE_USER_DATE_TASK,
	goalId,
	projectId,
	taskId,
	update
});

export const updateUserDatesTask = (goalId, projectId, taskId, start, end) => ({
	type: UPDATE_USER_DATES_TASK,
	goalId,
	projectId,
	taskId,
	start,
	end
});

/*
* Handle all user task tag functions
*/
export const addUserTaskTag = (goalId, projectId, taskId, tag) => ({
	type: ADD_USER_TASK_TAG,
	goalId,
	projectId,
	taskId,
	tag
});

export const deleteUserTaskTag = (goalId, projectId, taskId, index) => ({
	type: DELETE_USER_TASK_TAG,
	goalId,
	projectId,
	taskId,
	index
});

export const moveUserTaskTag = (goalId, projectId, taskId, tag, currPos, newPos) => ({
	type: MOVE_USER_TASK_TAG,
	goalId,
	projectId,
	taskId,
	tag,
	currPos,
	newPos
});

// export function addGoal(goal) {
// 	console.log('addGoal, goal ', goal);
// 	const maxid = Math.max(...data1.goals.map(o => o.id), 1);
// 	const url = `${ROOT_URL}&q=${city},us`;
// 	const request = axios.get(url);
// 	// console.log('request ', request);

// 	return {
// 		type: ADD_GOAL,
// 	};
// }
