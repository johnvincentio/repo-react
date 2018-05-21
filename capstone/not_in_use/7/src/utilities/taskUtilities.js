//

import * as datesUtilities from './datesUtilities';

export function isValidTaskKey(key) {
	const keys = [
		'taskid',
		'title',
		'description',
		'status',
		'starred',
		'tags',
		'repeat',
		'interval',
		'estimate',
		'actual',
		'start',
		'end'
	];
	return keys.find(item => item === key);
}

export function transformTaskForAddUpdate(task) {
	// console.log('>>> transformTaskForAddUpdate; task ', task);
	const newItem = {};
	Object.keys(task).forEach(key => {
		if (this.isValidTaskKey(key)) {
			const value = task[key];
			// console.log('key ', key, ' value ', value);
			if (value !== undefined && value !== '') {
				newItem[key] = value;
			}
		}
	});
	// console.log('<<< transformTaskForAddUpdate; newItem ', newItem);
	return newItem;
}

/*
* Task methods
*/
export function tasksFromGoalsById(goalId, projectId, goals) {
	const goal = goals.find(item => item.id === goalId);
	const project = goal.projects.find(item => item.id === projectId);
	return project.tasks;
}

export function taskFromGoalsById(goalId, projectId, taskId, goals) {
	const tasks = tasksFromGoalsById(goalId, projectId, goals);
	return tasks.find(item => item.id === taskId);
}

export function tasksFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			arr.push(...project.tasks);
		});
	});
	return arr;
}

export function tasksListFromGoals(param, goals) {
	// console.log('--- tasksListFromGoals, param ', param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				switch (param) {
					case 'scheduled':
						if (datesUtilities.isScheduled(task)) {
							arr.push({ goal, project, task });
						}
						break;
					case 'events':
						if (datesUtilities.isEvent(task)) {
							arr.push({ goal, project, task });
						}
						break;
					case 'late':
						if (datesUtilities.isLate(task)) {
							arr.push({ goal, project, task });
						}
						break;
					default:
						arr.push({ goal, project, task });
				}
			});
		});
	});
	return arr;
}

export function starredTasksListFromGoals(goals) {
	console.log('--- starredTasksListFromGoals, goals ', goals);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				if (task.starred) {
					arr.push({ goal, project, task });
				}
			});
		});
	});
	return arr;
}

export function dataFromGoalsByStatus(param, goals) {
	// console.log('--- dataFromGoalsByStatus, param ', param);
	const data = goals.filter(goal => {
		// console.log('goal ', goal);

		// prettier-ignore
		goal.projects = goal.projects.filter(project => {	// eslint-disable-line no-param-reassign
			// console.log('project ', project);
			// prettier-ignore
			project.tasks = project.tasks.filter(task => {	// eslint-disable-line no-param-reassign
				// console.log('task ', task);
				switch (param) {
					case 'scheduled':
						return datesUtilities.isScheduled(task);
					case 'events':
						return datesUtilities.isEvent(task);
					case 'late':
						return datesUtilities.isLate(task);
					default:
						return true;
				}
			});
			return project.tasks.length > 0;
		});
		return goal.projects.length > 0;
	});
	return data;
}

export function dataFromGoalsByTaskId(param, goals) {
	const taskId = param * 1;
	// console.log('--- dataFromGoalsByTaskId, taskId ', taskId, ' goals ', goals);
	const data = goals.filter(goal => {
		// console.log('goal ', goal);
		// prettier-ignore
		goal.projects = goal.projects.filter(project => {	// eslint-disable-line no-param-reassign
			// console.log('project ', project);
			// prettier-ignore
			project.tasks = project.tasks.filter(	// eslint-disable-line no-param-reassign
				task => task.taskid === taskId
			);
			return project.tasks.length > 0;
		});
		return goal.projects.length > 0;
	});
	return data;
}

function transformTaskToEvent(goal, project, task) {
	// console.log('transformTaskToEvent, task ', task);
	const start = datesUtilities.transformObjectToDate(task.start);
	const end = datesUtilities.transformObjectToDate(task.end);
	// console.log('transformTaskToEvent, start ', start, ' end ', end);
	const event = {
		goalId: goal.goalid,
		projectId: project.projectid,
		taskId: task.taskid,
		title: task.title,
		allDay: false,
		description: task.description,
		task
	};
	if ('start' in task && !('end' in task)) {
		event.allDay = true;
	}
	event.start = start === null ? end : start;
	event.end = end === null ? start : end;
	// console.log('transformTaskToEvent, event ', event);
	return event;
}

export function eventsListFromGoals(param, goals) {
	// console.log('--- eventsListFromGoals, param ', param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				switch (param) {
					case 'scheduled':
						if (datesUtilities.isScheduled(task)) {
							arr.push(transformTaskToEvent(goal, project, task));
						}
						break;
					case 'events':
						if (datesUtilities.isEvent(task)) {
							arr.push(transformTaskToEvent(goal, project, task));
						}
						break;
					case 'all':
					default:
						if (datesUtilities.isScheduled(task) || datesUtilities.isEvent(task)) {
							arr.push(transformTaskToEvent(goal, project, task));
						}
						break;
				}
			});
		});
	});
	return arr;
}

export function maxTaskIdFromGoals(goals) {
	// console.log('maxTaskIdFromGoals, goals ', goals);
	const tasks = tasksFromGoals(goals);
	// console.log('maxTaskIdFromGoals, tasks ', tasks);
	return Math.max(...tasks.map(o => o.id), 1);
}

export function addTaskByGoalIdProjectId(goalId, projectId, task, goals) {
	// console.log('addTaskByGoalIdProjectId, goalId ', goalId, ' projectId ', projectId,
	// ' task ', task, ' goals ', goals);
	goals.forEach(goal => {
		if (goal.id === goalId) {
			goal.projects.forEach(project => {
				// console.log('addTaskByGoalIdProjectId, goal ', goal, ' project ', project);
				if (projectId === project.id) {
					project.tasks.push(task);
				}
			});
		}
	});
	// console.log('goals ', goals);
	return goals;
}

export function updateTaskByGoalIdProjectId(goalId, projectId, taskId, newTask, goals) {
	// prettier-ignore
	// console.log('>>> updateTaskByGoalIdProjectId, goalId ', goalId, ' projectId ', projectId,
	// ' taskId ', taskId, ' goals ', goals, ' newTask ', newTask);
	const goal = goals.find(item => item.id === goalId);
	const project = goal.projects.find(item => item.id === projectId);
	const index = project.tasks.findIndex(item => item.id === taskId);
	// console.log('task (1) ', project.tasks[index]);
	project.tasks[index] = { ...newTask };
	// console.log('<<< updateTaskByGoalIdProjectId; goals ', goals);
	return goals;
}

export function deleteTaskByGoalIdProjectIdByTaskId(goalId, projectId, taskId, goals) {
	// console.log('deleteTaskByGoalIdProjectIdByTaskId, goalId ', goalId, ' projectId ', projectId,
	// ' taskId ', taskId, ' goals ', goals);
	const goal = goals.find(item => item.id === goalId);
	const project = goal.projects.find(item => item.id === projectId);
	project.tasks = project.tasks.filter(sub => !(taskId === sub.id));
	// console.log('goals ', goals);
	return goals;
}

export function moveTaskById(drag, drop, before, goals) {
	// console.log('moveTaskById, drag ', drag, ' drop ', drop, ' before ', before, ' goals ', goals);
	const moveTask = taskFromGoalsById(drag.goalId, drag.projectId, drag.taskId, goals);
	// console.log('moveTask ', moveTask);
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			const arr = [];
			project.tasks.forEach(task => {
				if (drag.goalId !== goal.id || drag.projectId !== project.id || drag.taskId !== task.id) {
					if (before && goal.id === drop.goalId && project.id === drop.projectId && task.id === drop.taskId) {
						// move task here
						arr.push(moveTask);
					}
					arr.push(task);
					if (!before && goal.id === drop.goalId && project.id === drop.projectId && task.id === drop.taskId) {
						// move task here
						arr.push(moveTask);
					}
				}
			});
			project.tasks = arr; // eslint-disable-line no-param-reassign
		});
	});
	// console.log('goals ', goals);
	return goals;
}

export function moveTaskToGoal(from, to, goals) {
	// console.log('moveTaskToGoal, from ', from, ' to ', to, ' goals ', goals);
	const moveTask = taskFromGoalsById(from.goalId, from.projectId, from.taskId, goals);
	// console.log('moveTask ', moveTask);
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			const arr = [];
			project.tasks.forEach(task => {
				if (from.goalId !== goal.id || from.projectId !== project.id || from.taskId !== task.id) {
					arr.push(task);
				}
			});
			project.tasks = arr; // eslint-disable-line no-param-reassign
			if (goal.id === to.goalId && project.id === to.projectId) {
				project.tasks.push(moveTask);
			}
		});
	});
	// console.log('goals ', goals);
	return goals;
}

export function moveTaskToProjectById(from, to, goals) {
	// console.log('moveTaskToProjectById, from ', from, ' to ', to, ' goals ', goals);
	const moveTask = taskFromGoalsById(from.goalId, from.projectId, from.taskId, goals);
	let moved = false;
	// console.log('moveTask ', moveTask);
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			const arr = [];
			project.tasks.forEach(task => {
				if (from.goalId !== goal.id || from.projectId !== project.id || from.taskId !== task.id) {
					// ignore from task
					if (goal.id === to.goalId && project.id === to.projectId) {
						// move task here
						if (!moved) {
							arr.push(moveTask);
							moved = true;
						}
					}
					arr.push(task);
				}
			});
			project.tasks = arr; // eslint-disable-line no-param-reassign
		});
	});
	// console.log('goals ', goals);
	return goals;
}

export function cloneTask(task, goals) {
	// console.log('---cloneTask, task ', task);
	const newTask = JSON.parse(JSON.stringify(task));
	newTask.id = maxTaskIdFromGoals(goals) + 1;
	newTask.title = `Clone_of_${newTask.title}`;
	// console.log('---cloneTask, newTask ', newTask);
	return newTask;
}

export function cloneTaskById(goalId, projectId, taskId, goals) {
	// console.log('cloneTaskById, goalId ', goalId, ' projectId ', projectId,
	// ' taskId ', taskId, ' goals ', goals);
	const taskToClone = taskFromGoalsById(goalId, projectId, taskId, goals);
	const clonedTask = cloneTask(taskToClone, goals);

	goals.forEach(goal => {
		goal.projects.forEach(project => {
			const arr = [];
			project.tasks.forEach(task => {
				arr.push(task);
				if (goalId === goal.id && projectId === project.id && taskId === task.id) {
					arr.push(clonedTask);
				}
			});
			project.tasks = arr; // eslint-disable-line no-param-reassign
		});
	});
	// console.log('goals ', goals);
	return goals;
}

export function cloneTasks(goalId, projectId, goals) {
	// console.log('cloneTasks, goalId ', goalId, ' projectId ', projectId, ' goals ', goals);
	let maxId = maxTaskIdFromGoals(goals);
	const goal = goals.find(item => item.id === goalId);
	const project = goal.projects.find(item => item.id === projectId);
	const arr = [];
	project.tasks.forEach(task => {
		const newTask = JSON.parse(JSON.stringify(task));
		maxId += 1;
		newTask.id = maxId;
		arr.push(newTask);
	});
	return arr;
}

export function updateTaskDateById(goalId, projectId, taskId, update, goals) {
	// console.log('updateTaskDateById, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId, ' goals ', goals);
	// console.log('update ', update);
	const goal = goals.find(item => item.id === goalId);
	const project = goal.projects.find(item => item.id === projectId);
	const task = project.tasks.find(item => item.id === taskId);
	// console.log('task (1) ', task);
	if (!task[update.field]) {
		task[update.field] = {};
	}
	const tmp = task[update.field];
	// console.log('tmp (1) ', tmp);
	tmp[update.value.field] = update.value.value;
	// console.log('tmp (2) ', tmp);
	// console.log('task (2) ', task);
	// console.log('goals ', goals);
	return goals;
}
// 	obj.goals = taskUtilities.updateTaskDatesById(goalId, projectId, taskId, start, end, obj.goals);

export function updateTaskDatesById(goalId, projectId, taskId, start, end, goals) {
	// console.log('updateTaskDateById, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId, ' goals ', goals);
	const goal = goals.find(item => item.id === goalId);
	const project = goal.projects.find(item => item.id === projectId);
	const task = project.tasks.find(item => item.id === taskId);
	task.start = start;
	task.end = end;
	return goals;
}
