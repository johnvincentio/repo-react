/**
 * Utility methods
 *
 * @class utils
 */

const utils = {
	/*
	* Goals
	*/
	maxGoalIdfromGoals(goals) {
		return Math.max(...goals.map(o => o.goalid), 1);
	},

	cloneGoalById(goalId, goals) {
		let maxProjectId = this.maxProjectIdFromGoals(goals);
		let maxTaskId = this.maxTaskIdFromGoals(goals);

		const cloneGoal = JSON.parse(JSON.stringify(this.goalFromGoalsById(goalId, goals)));
		cloneGoal.goalid = this.maxGoalIdfromGoals(goals) + 1;
		cloneGoal.title = `Clone_of_${cloneGoal.title}`;
		cloneGoal.projects.forEach(project => {
			const outer = project;
			maxProjectId += 1;
			outer.projectid = maxProjectId;
			outer.tasks.forEach(task => {
				const inner = task;
				maxTaskId += 1;
				inner.taskid = maxTaskId;
			});
		});

		const arr = [];
		goals.forEach(goal => {
			arr.push(goal);
			if (goal.goalid === goalId) {
				arr.push(cloneGoal);
			}
		});
		return arr;
	},

	goalFromGoalsById(id, goals) {
		const abc = id * 1;
		return goals.find(goal => goal.goalid === abc);
	},

	updateGoalById(goalid, update, goals) {
		// console.log('updateGoalById, goalid ', goalid, ' update ', update, ' goals ', goals);
		const updateGoal = this.goalFromGoalsById(goalid, goals);
		const { title, description, status } = update;
		updateGoal.title = title;
		updateGoal.description = description;
		updateGoal.status = status;
		// console.log('updateGoal ', updateGoal);
		return goals;
	},

	/*
	* Projects
	*/

	projectsFromGoals(goals) {
		const arr = [];
		goals.forEach(goal => {
			goal.projects.forEach(project => arr.push(project));
		});
		return arr;
	},

	maxProjectIdFromGoals(goals) {
		const projects = this.projectsFromGoals(goals);
		return Math.max(...projects.map(o => o.projectid), 1);
	},

	projectFromGoalsById(id, goals) {
		const abc = id * 1;
		const arr = this.projectsFromGoals(goals);
		return arr.find(project => project.projectid === abc);
	},

	deleteProjectByGoalIdProjectId(goalId, projectId, goals) {
		// console.log('deleteProjectByGoalIdProjectId, goalId ', goalId, ' projectId ', projectId, ' goals ', goals);
		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				if (goalId !== goal.goalid || projectId !== project.projectid) {
					arr.push(project);
				}
			});
			outer.projects = arr;
		});
		// console.log('goals ', goals);
		return goals;
	},

	cloneProjectById(goalId, projectId, goals) {
		// console.log('cloneProjectById, goalId ', goalId, ' projectId ', projectId, ' goals ', goals);
		const cloneProject = JSON.parse(JSON.stringify(this.projectFromGoalsById(projectId, goals)));
		cloneProject.projectid = this.maxProjectIdFromGoals(goals) + 1;
		cloneProject.title = `Clone_of_${cloneProject.title}`;
		cloneProject.tasks = this.cloneTasks(goalId, projectId, goals);

		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				arr.push(project);
				if (goalId === goal.goalid && projectId === project.projectid) {
					arr.push(cloneProject);
				}
			});
			outer.projects = arr;
		});
		// console.log('cloneProjectById, goals ', goals);
		return goals;
	},

	updateProjectById(goalId, projectId, update, goals) {
		// console.log('updateProjectById, update ', update, ' goals ', goals);
		const updateProject = this.projectFromGoalsByIds(goalId, projectId, goals);
		const { title, description, status } = update;
		updateProject.title = title;
		updateProject.description = description;
		updateProject.status = status;
		// updateProject[update.field] = update.value;
		// console.log('updateProject ', updateProject);
		return goals;
	},

	projectFromGoalsByIds(goalId, projectId, goals) {
		const goal = this.goalFromGoalsById(goalId, goals);
		// console.log('goal', goal);
		return this.projectFromProjectsById(projectId, goal.projects);
	},

	projectFromProjectsById(projectId, projects) {
		const abc = projectId * 1;
		return projects.find(project => project.projectid === abc);
	},

	/*
	* Tasks
	*/
	maxTaskIdFromGoals(goals) {
		// console.log('maxTaskIdFromGoals, goals ', goals);
		const tasks = this.tasksFromGoals(goals);
		// console.log('maxTaskIdFromGoals, tasks ', tasks);
		return Math.max(...tasks.map(o => o.taskid), 1);
	},

	tasksFromGoals(goals) {
		const arr = [];
		goals.forEach(goal => {
			goal.projects.forEach(project => {
				arr.push(...project.tasks);
			});
		});
		return arr;
	},

	cloneTasks(goalId, projectId, goals) {
		// console.log('cloneTasks, goalId ', goalId, ' projectId ', projectId, ' goals ', goals);
		let maxId = this.maxTaskIdFromGoals(goals);
		const goal = goals.find(item => item.goalid === goalId);
		const project = goal.projects.find(item => item.projectid === projectId);
		const arr = [];
		project.tasks.forEach(task => {
			const newTask = JSON.parse(JSON.stringify(task));
			maxId += 1;
			newTask.taskid = maxId;
			arr.push(newTask);
		});
		return arr;
	},

	addTaskByGoalIdProjectId(goalId, projectId, task, goals) {
		// console.log('addTaskByGoalIdProjectId, goalId ', goalId, ' projectId ', projectId,
		// ' task ', task, ' goals ', goals);
		goals.forEach(goal => {
			if (goal.goalid === goalId) {
				goal.projects.forEach(project => {
					// console.log('addTaskByGoalIdProjectId, goal ', goal, ' project ', project);
					if (projectId === project.projectid) {
						project.tasks.push(task);
					}
				});
			}
		});
		// console.log('goals ', goals);
		return goals;
	},

	deleteTaskByGoalIdProjectIdTaskId(goalId, projectId, taskId, goals) {
		// console.log('deleteTaskByGoalIdProjectIdTaskId, goalId ', goalId, ' projectId ', projectId,
		// ' taskId ', taskId, ' goals ', goals);
		const goal = goals.find(item => item.goalid === goalId);
		const project = goal.projects.find(item => item.projectid === projectId);
		project.tasks = project.tasks.filter(sub => !(taskId === sub.taskid));
		// console.log('goals ', goals);
		return goals;
	},

	cloneTaskById(goalId, projectId, taskId, goals) {
		// console.log('cloneTaskById, goalId ', goalId, ' projectId ', projectId,
		// ' taskId ', taskId, ' goals ', goals);
		const taskToClone = this.taskFromGoalsById(goalId, projectId, taskId, goals);
		const clonedTask = this.cloneTask(taskToClone, goals);

		goals.forEach(goal => {
			goal.projects.forEach(project => {
				const arr = [];
				project.tasks.forEach(task => {
					arr.push(task);
					if (goalId === goal.goalid && projectId === project.projectid && taskId === task.taskid) {
						arr.push(clonedTask);
					}
				});
				project.tasks = arr; // eslint-disable-line no-param-reassign
			});
		});
		// console.log('goals ', goals);
		return goals;
	},

	taskFromGoalsById(goalId, projectId, taskId, goals) {
		const tasks = this.tasksFromGoalsById(goalId, projectId, goals);
		return tasks.find(item => item.taskid === taskId);
	},

	cloneTask(task, goals) {
		// console.log('---cloneTask, task ', task);
		const newTask = JSON.parse(JSON.stringify(task));
		newTask.taskid = this.maxTaskIdFromGoals(goals) + 1;
		newTask.title = `Clone_of_${newTask.title}`;
		// console.log('---cloneTask, newTask ', newTask);
		return newTask;
	},

	tasksFromGoalsById(goalId, projectId, goals) {
		const goal = goals.find(item => item.goalid === goalId);
		const project = goal.projects.find(item => item.projectid === projectId);
		return project.tasks;
	},

	updateTaskByGoalIdProjectId(goalId, projectId, taskId, newTask, goals) {
		// prettier-ignore
		// console.log('>>> updateTaskByGoalIdProjectId, goalId ', goalId, ' projectId ', projectId,
		// ' taskId ', taskId, ' goals ', goals, ' newTask ', newTask);
		const goal = goals.find(item => item.goalid === goalId);
		const project = goal.projects.find(item => item.projectid === projectId);
		const index = project.tasks.findIndex(item => item.taskid === taskId);
		// console.log('task (1) ', project.tasks[index]);
		project.tasks[index] = { ...newTask };
		// console.log('<<< updateTaskByGoalIdProjectId; goals ', goals);
		return goals;
	},

	updateTaskDatesById(goalId, projectId, taskId, start, end, goals) {
		// console.log('updateTaskDateById, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId,
		// ' goals ', goals);
		const goal = goals.find(item => item.goalid === goalId);
		const project = goal.projects.find(item => item.projectid === projectId);
		const task = project.tasks.find(item => item.taskid === taskId);
		task.start = start;
		task.end = end;
		return goals;
	}
};

module.exports = utils;

/*
	goalsFromGoals(goals) {
		const arr = [];
		goals.forEach(goal => {
			arr.push(goal);
		});
		return arr;
	},

	goalFromGoalsByProjectId(id, goals) {
		const projects = projectsUtils.projectsWithGoalFromGoals(goals);
		// console.log('goalFromGoalsByProjectId, projects ', projects);
		const goal = projects.find(item => item.project.projectid === id * 1);
		// console.log('goal ', goal);
		return goal;
	},

	moveGoalById(goalId, dropId, before, goals) {
		// console.log('moveGoalById, goalId ', goalId, ' dropId ', dropId, ' before ', before, ' goals ', goals);
		const moveGoal = this.goalFromGoalsById(goalId, goals);
		const arr = [];
		goals.forEach(goal => {
			if (goal.id !== goalId) {
				if (before && goal.goalid === dropId) {
					arr.push(moveGoal);
				}
				arr.push(goal);
				if (!before && goal.goalid === dropId) {
					arr.push(moveGoal);
				}
			}
		});
		return arr;
	},

	goalsListOptions(goals) {
		const arr = [];
		goals.forEach(goal => {
			arr.push({ id: goal.goalid, title: goal.title });
		});
		return arr;
	},

	goalsListOption(id, goals) {
		const goal = this.goalFromGoalsById(id, goals);
		return goal.title;
	}
*/

/*
	projectsWithGoalFromGoals(goals) {
		const arr = [];
		goals.forEach(goal => {
			goal.projects.forEach(project => arr.push({ project, goal }));
		});
		return arr;
	},

	moveProjectById(from, to, before, goals) {
		// console.log('moveProjectById, from ', from, ' to ', to, 'before ', before, ' goals ', goals);
		const moveProject = this.projectFromGoalsById(from.projectId, goals);
		// console.log('moveProject ', moveProject);
		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				if (from.goalId !== goal.goalid || from.projectId !== project.projectid) {
					if (before && goal.goalid === to.goalId && project.projectid === to.projectId) {
						// move project here
						arr.push(moveProject);
					}
					arr.push(project);
					if (!before && goal.goalid === to.goalId && project.projectid === to.projectId) {
						// move project here
						arr.push(moveProject);
					}
				}
			});
			outer.projects = arr;
		});
		// console.log('goals ', goals);
		return goals;
	},

	moveProjectToGoal(from, to, goals) {
		// console.log('moveProjectToGoal, from ', from, ' to ', to, ' goals ', goals);
		const moveProject = this.projectFromGoalsById(from.projectId, goals);
		// console.log('moveProject ', moveProject);
		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				if (from.goalId !== goal.goalid || from.projectId !== project.projectid) {
					arr.push(project);
				}
			});
			outer.projects = arr;
			if (goal.goalid === to.goalId) {
				goal.projects.push(moveProject);
			}
		});
		// console.log('goals ', goals);
		return goals;
	},

	projectsListOptions(goalId, goals) {
		// console.log('---projectsListOptions, goalId ', goalId);
		const arr = [];
		const goal = goalsUtils.goalFromGoalsById(goalId, goals);
		goal.projects.forEach(project => {
			arr.push({ id: project.projectid, title: project.title });
		});
		// console.log('arr ', arr);
		return arr;
	},

	projectsListOption(goalId, projectId, goals) {
		// console.log('---projectsListOption, goalId ', goalId, ' projectId ', projectId);
		const project = this.projectFromGoalsByIds(goalId, projectId, goals);
		// console.log('projectsListOption, project ', project);
		return project.projectid;
	}
*/

/*
isValidTaskKey(key) {
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
	},

	transformTaskForAddUpdate(task) {
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
	},


tasksListFromGoals(param, goals) {
	// console.log('--- tasksListFromGoals, param ', param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				switch (param) {
					case 'scheduled':
						if (datesUtils.isScheduled(task)) {
							arr.push({ goal, project, task });
						}
						break;
					case 'events':
						if (datesUtils.isEvent(task)) {
							arr.push({ goal, project, task });
						}
						break;
					case 'late':
						if (datesUtils.isLate(task)) {
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
},

starredTasksListFromGoals(goals) {
	// console.log('--- starredTasksListFromGoals, param ', param);
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
},

dataFromGoalsByStatus(param, goals) {
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
						return datesUtils.isScheduled(task);
					case 'events':
						return datesUtils.isEvent(task);
					case 'late':
						return datesUtils.isLate(task);
					default:
						return true;
				}
			});
			return project.tasks.length > 0;
		});
		return goal.projects.length > 0;
	});
	return data;
},

dataFromGoalsByTaskId(param, goals) {
	const taskId = param * 1;
	// console.log('--- dataFromGoalsByTaskId, taskId ', taskId);
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
},

transformTaskToEvent(goal, project, task) {
	// console.log('transformTaskToEvent, task ', task);
	const start = datesUtils.transformObjectToDate(task.start);
	const end = datesUtils.transformObjectToDate(task.end);
	// console.log('transformTaskToEvent, start ', start, ' end ', end);
	const event = {
		goalId: goal.goalid,
		projectId: project.projectid,
		taskId: task.taskid,
		title: task.title,
		allDay: false,
		task
	};
	if ('start' in task && !('end' in task)) {
		event.allDay = true;
	}
	event.start = start === null ? end : start;
	event.end = end === null ? start : end;
	// console.log('transformTaskToEvent, event ', event);
	return event;
},

eventsListFromGoals(param, goals) {
	// console.log('--- eventsListFromGoals, param ', param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				switch (param) {
					case 'scheduled':
						if (datesUtils.isScheduled(task)) {
							arr.push(this.transformTaskToEvent(goal, project, task));
						}
						break;
					case 'events':
						if (datesUtils.isEvent(task)) {
							arr.push(this.transformTaskToEvent(goal, project, task));
						}
						break;
					case 'all':
					default:
						if (datesUtils.isScheduled(task) || datesUtils.isEvent(task)) {
							arr.push(this.transformTaskToEvent(goal, project, task));
						}
						break;
				}
			});
		});
	});
	return arr;
},

moveTaskById(drag, drop, before, goals) {
	// console.log('moveTaskById, drag ', drag, ' drop ', drop, ' before ', before, ' goals ', goals);
	const moveTask = this.taskFromGoalsById(drag.goalId, drag.projectId, drag.taskId, goals);
	// console.log('moveTask ', moveTask);
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			const arr = [];
			project.tasks.forEach(task => {
				if (
					drag.goalId !== goal.goalid ||
					drag.projectId !== project.projectid ||
					drag.taskId !== task.taskid
				) {
					if (
						before &&
						goal.goalid === drop.goalId &&
						project.projectid === drop.projectId &&
						task.taskid === drop.taskId
					) {
						// move task here
						arr.push(moveTask);
					}
					arr.push(task);
					if (
						!before &&
						goal.goalid === drop.goalId &&
						project.projectid === drop.projectId &&
						task.taskid === drop.taskId
					) {
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
},

moveTaskToGoal(from, to, goals) {
	// console.log('moveTaskToGoal, from ', from, ' to ', to, ' goals ', goals);
	const moveTask = this.taskFromGoalsById(from.goalId, from.projectId, from.taskId, goals);
	// console.log('moveTask ', moveTask);
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			const arr = [];
			project.tasks.forEach(task => {
				if (
					from.goalId !== goal.goalid ||
					from.projectId !== project.projectid ||
					from.taskId !== task.taskid
				) {
					arr.push(task);
				}
			});
			project.tasks = arr; // eslint-disable-line no-param-reassign
			if (goal.goalid === to.goalId && project.projectid === to.projectId) {
				project.tasks.push(moveTask);
			}
		});
	});
	// console.log('goals ', goals);
	return goals;
},

moveTaskToProjectById(from, to, goals) {
	// console.log('moveTaskToProjectById, from ', from, ' to ', to, ' goals ', goals);
	const moveTask = this.taskFromGoalsById(from.goalId, from.projectId, from.taskId, goals);
	let moved = false;
	// console.log('moveTask ', moveTask);
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			const arr = [];
			project.tasks.forEach(task => {
				if (
					from.goalId !== goal.goalid ||
					from.projectId !== project.projectid ||
					from.taskId !== task.taskid
				) {
					// ignore from task
					if (goal.goalid === to.goalId && project.projectid === to.projectId) {
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
},

updateTaskDateById(goalId, projectId, taskId, update, goals) {
	// console.log('updateTaskDateById, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId, ' goals ', goals);
	// console.log('update ', update);
	const goal = goals.find(item => item.goalid === goalId);
	const project = goal.projects.find(item => item.projectid === projectId);
	const task = project.tasks.find(item => item.taskid === taskId);
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
},
// 	obj.goals = taskUtilities.updateTaskDatesById(goalId, projectId, taskId, start, end, obj.goals);

*/
