
import {
	SELECTED_GOAL,
	SELECTED_PROJECT,
	SELECTED_TASK,
	SELECTED_INITIALIZE,
} from '../constants/action.types';

/*
* Handle all selected functions
*/

export const selectedGoal = goalId => ({
	type: SELECTED_GOAL,
	goalId,
});

export const selectedProject = (goalId, projectId) => ({
	type: SELECTED_PROJECT,
	goalId,
	projectId,
});

export const selectedTask = (goalId, projectId, taskId) => ({
	type: SELECTED_TASK,
	goalId,
	projectId,
	taskId,
});

export const selectedInitialize = () => ({
	type: SELECTED_INITIALIZE,
});
