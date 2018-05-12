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

import USER_DATA from '../../data/user-data';

import * as goalUtilities from '../../utilities/goalUtilities';
import * as projectUtilities from '../../utilities/projectUtilities';
import * as taskUtilities from '../../utilities/taskUtilities';
import * as tagUtilities from '../../utilities/tagUtilities';

import * as searchUtilities from '../../utilities/searchUtilities';

const initialState = USER_DATA;

function data(state = initialState, action) {
	console.log('--- data.reducer; action.type ', action.type);
	// const newState = Object.assign({}, state);
	// console.log('--- data.reducer, action ', action, ' state ', state);

	/*
	* Handle moving user object to a different object
	*/
	if (action.type === MOVE_USER_OBJECT) {
		const { from, to, before } = action;
		// console.log('MOVE_USER_OBJECT, from ', from, ' to ', to, ' before ', before);
		const obj = JSON.parse(JSON.stringify(state));
		if (from.type === 'goal' && to.type === 'goal') {
			obj.goals = goalUtilities.moveGoalById(from.goalId, to.goalId, before, obj.goals);
		}
		if (from.type === 'project' && to.type === 'project') {
			projectUtilities.moveProjectById(from, to, before, obj.goals);
		}
		if (from.type === 'task' && to.type === 'task') {
			obj.goals = taskUtilities.moveTaskById(from, to, before, obj.goals);
		}

		if (from.type === 'project' && to.type === 'goal') {
			projectUtilities.moveProjectToGoal(from, to, obj.goals);
		}
		if (from.type === 'task' && to.type === 'project') {
			obj.goals = taskUtilities.moveTaskToGoal(from, to, obj.goals);
		}
		return obj;
	}

	/*
	* Handle all user goal functions
	*/
	if (action.type === ADD_USER_GOAL) {
		// console.log('add goal; action.goal ', action.goal);
		const { title, description, status } = action.goal;
		const newitem = {
			id: goalUtilities.maxGoalIdfromGoals(state.goals) + 1,
			title,
			description,
			status,
			projects: []
		};
		// console.log('ADD_USER_GOAL, newitem ', newitem);
		return Object.assign({}, state, { goals: state.goals.concat(newitem) });
	}

	if (action.type === DELETE_USER_GOAL) {
		// console.log('DELETE_USER_GOAL, action.goalId ', action.goalId);
		return Object.assign({}, state, {
			goals: state.goals.filter(item => item.id !== action.goalId)
		});
	}

	if (action.type === CLONE_USER_GOAL) {
		const { goalId } = action;
		// console.log('CLONE_USER_GOAL, goalId ', goalId);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = goalUtilities.cloneGoalById(goalId, obj.goals);
		return obj;
	}

	if (action.type === UPDATE_USER_GOAL) {
		const { goalId, update } = action;
		console.log('UPDATE_USER_GOAL, goalId ', goalId, ' update ', update);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = goalUtilities.updateGoalById(goalId, update, obj.goals);
		return obj;
	}

	/*
	* Handle all user project functions
	*/
	if (action.type === ADD_USER_PROJECT) {
		// console.log('ADD_USER_PROJECT, action ', action);
		const obj = JSON.parse(JSON.stringify(state));
		// console.log('obj ', obj);
		const goal = goalUtilities.goalFromGoalsById(action.goalId, obj.goals);
		// console.log('goal ', goal);
		const { title, description, status } = action.project;
		const newitem = {
			id: projectUtilities.maxProjectIdFromGoals(obj.goals) + 1,
			title,
			description,
			status,
			tasks: []
		};
		// console.log('newitem ', newitem);
		goal.projects.push(newitem);
		return obj;
	}

	if (action.type === DELETE_USER_PROJECT) {
		const { goalId, projectId } = action;
		// console.log('DELETE_USER_PROJECT, goalId ', goalId, ' projectId ', projectId);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = projectUtilities.deleteProjectByGoalIdProjectId(goalId, projectId, obj.goals);
		return obj;
	}

	if (action.type === CLONE_USER_PROJECT) {
		const { goalId, projectId } = action;
		// console.log('CLONE_USER_PROJECT, goalId ', goalId, ' projectId ', projectId);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = projectUtilities.cloneProjectById(goalId, projectId, obj.goals);
		return obj;
	}

	if (action.type === UPDATE_USER_PROJECT) {
		const { goalId, projectId, update } = action;
		// console.log('UPDATE_USER_PROJECT, goalId ', goalId, ' projectId ', projectId, ' update ', update);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = projectUtilities.updateProjectById(goalId, projectId, update, obj.goals);
		return obj;
	}

	/*
	* Handle all user task functions
	*/
	if (action.type === ADD_USER_TASK) {
		const { goalId, projectId, task } = action;
		// console.log('ADD_USER_TASK, goalId ', goalId, ' projectId ', projectId, ' task ', task);
		const obj = JSON.parse(JSON.stringify(state));
		const newItem = taskUtilities.transformTaskForAddUpdate(task);
		newItem.id = taskUtilities.maxTaskIdFromGoals(obj.goals) + 1;
		// console.log('newItem ', newItem);
		obj.goals = taskUtilities.addTaskByGoalIdProjectId(goalId, projectId, newItem, obj.goals);
		return obj;
	}

	if (action.type === DELETE_USER_TASK) {
		const { goalId, projectId, taskId } = action;
		// console.log('DELETE_USER_TASK, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = taskUtilities.deleteTaskByGoalIdProjectIdByTaskId(goalId, projectId, taskId, obj.goals);
		return obj;
	}

	if (action.type === MOVE_USER_TASK_PROJECT) {
		const { from, to } = action;
		// console.log('MOVE_USER_TASK_PROJECT, from ', from, ' to ', to);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = taskUtilities.moveTaskToProjectById(from, to, obj.goals);
		// console.log('obj ', obj);
		return obj;
	}

	if (action.type === CLONE_USER_TASK) {
		const { goalId, projectId, taskId } = action;
		// console.log('CLONE_USER_TASK, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = taskUtilities.cloneTaskById(goalId, projectId, taskId, obj.goals);
		return obj;
	}

	if (action.type === UPDATE_USER_TASK) {
		const { goalId, projectId, taskId, task } = action; // eslint-disable-line object-curly-newline
		// console.log('UPDATE_USER_TASK, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId, ' task ', task);
		const obj = JSON.parse(JSON.stringify(state));
		const newItem = taskUtilities.transformTaskForAddUpdate(task);
		// console.log('newItem ', newItem);
		obj.goals = taskUtilities.updateTaskByGoalIdProjectId(goalId, projectId, taskId, newItem, obj.goals);
		return obj;
	}

	if (action.type === UPDATE_USER_DATE_TASK) {
		const { goalId, projectId, taskId, update } = action; // eslint-disable-line object-curly-newline
		// console.log('UPDATE_USER_DATE_TASK, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId,
		// ' update ', update);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = taskUtilities.updateTaskDateById(goalId, projectId, taskId, update, obj.goals);
		return obj;
	}

	if (action.type === UPDATE_USER_DATES_TASK) {
		const { goalId, projectId, taskId, start, end } = action; // eslint-disable-line object-curly-newline
		// console.log('UPDATE_USER_DATES_TASK, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId,
		// ' start ', start, ' end ', end);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = taskUtilities.updateTaskDatesById(goalId, projectId, taskId, start, end, obj.goals);
		return obj;
	}

	/*
	* Handle all user task tag functions
	*/
	if (action.type === ADD_USER_TASK_TAG) {
		const { goalId, projectId, taskId, tag } = action; // eslint-disable-line object-curly-newline
		// console.log('ADD_USER_TASK_TAG, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId, ' tag ', tag);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = tagUtilities.addTagToTask(goalId, projectId, taskId, tag, obj.goals);
		// console.log('obj ', obj);
		return obj;
	}

	if (action.type === DELETE_USER_TASK_TAG) {
		const { goalId, projectId, taskId, index } = action; // eslint-disable-line object-curly-newline
		// console.log('DELETE_USER_TASK_TAG, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId,
		// eslint-disable-line no-param-reassign' index ', index);
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = tagUtilities.deleteTagFromTask(goalId, projectId, taskId, index, obj.goals);
		return obj;
	}

	if (action.type === MOVE_USER_TASK_TAG) {
		const { goalId, projectId, taskId, tag, currPos, newPos } = action; // eslint-disable-line object-curly-newline
		const obj = JSON.parse(JSON.stringify(state));
		obj.goals = tagUtilities.moveTagInTask(goalId, projectId, taskId, tag, currPos, newPos, obj.goals);
		return obj;
	}

	if (action.type === SEARCH_USER_DATA) {
		const { search } = action;
		const obj = JSON.parse(JSON.stringify(initialState));
		obj.goals = searchUtilities.search(search, obj.goals);
		return obj;
	}

	switch (action.type) {
		case GET_USER_DATA:
			return Object.assign({}, state);
		default:
			return state;
	}
}

export default data;

// function move(array, from, to) {
// 	if (to === from) {
// 		return array;
// 	}
// 	const target = array[from];
// 	const increment = to < from ? -1 : 1;
// 	for (let k = from; k !== to; k += increment) {
// 		array[k] = array[k + increment];
// 	}
// 	array[to] = target;
// 	return array;
// }

/*
DELETE_ITEM: (state, action) => ({
  ...state,
  items: state.items.filter(item => item !== action.payload),
  lastUpdated: Date.now()
})
*/

/*
import * as actions from '../actions/index';

const initialRepositoryState = { guessed: [] };

// eslint-disable-next-line no-mixed-operators
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const repositoryReducer = (state = initialRepositoryState, action) => {
  if (action.type === actions.USER_GUESSED_NUMBER) {
    return Object.assign({}, state, { guessed: [action.guess, ...state.guessed] });
  }

  if (action.type === actions.RANDOM_NUMBER) {
		return Object.assign({}, state,
			{ random: randomInteger(action.fromNumber, action.toNumber) });
  }

  return state;
};

export default repositoryReducer;

*/
/*
  if (action.type === actions.ADD_REPOSITORY) {
    return [...state, {
      name: action.repository,
      rating: null,
    }];
	}
*/
