
import {
	SELECTED_GOAL,
	SELECTED_PROJECT,
	SELECTED_TASK,
	SELECTED_INITIALIZE,
} from '../constants/action.types';

const initialState = {
	selected: {
		selectedType: '', selectedGoalId: -1, selectedProjectId: -1, selectedTaskId: -1,
	},
};

/*
* Handle all selected functions
*/
function selected(state = initialState, action) {
	// console.log('selected.reducer, action', action, ' state ', state);
	switch (action.type) {
		case SELECTED_GOAL:
			if (state.selected.selectedType === 'goal' && action.goalId === state.selected.selectedGoalId) {
				return initialState;
			}
			return {
				selected: {
					selectedType: 'goal',
					selectedGoalId: action.goalId,
					selectedProjectId: -1,
					selectedTaskId: -1,
				},
			};

		case SELECTED_PROJECT:
			if (state.selected.selectedType === 'project' &&
				action.goalId === state.selected.selectedGoalId &&
				action.projectId === state.selected.selectedProjectId) {
				return initialState;
			}
			return {
				selected: {
					selectedType: 'project',
					selectedGoalId: action.goalId,
					selectedProjectId: action.projectId,
					selectedTaskId: -1,
				},
			};

		case SELECTED_TASK:
			if (state.selected.selectedType === 'task' &&
				action.goalId === state.selected.selectedGoalId &&
				action.projectId === state.selected.selectedProjectId &&
				action.taskId === state.selected.selectedTaskId) {
				return initialState;
			}
			return {
				selected: {
					selectedType: 'task',
					selectedGoalId: action.goalId,
					selectedProjectId: action.projectId,
					selectedTaskId: action.taskId,
				},
			};

		case SELECTED_INITIALIZE:
			return initialState;

		default:
			return state;
	}
}

export default selected;
