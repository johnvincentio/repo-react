/**
 * Utility methods to handle tasks related to goals
 *
 * @class GoalsUtils
 */

const ProjectsUtils = require('./projects');

const projectsUtils = new ProjectsUtils();

const TasksUtils = require('./tasks');

const tasksUtils = new TasksUtils();

/* eslint-disable class-methods-use-this */

/*
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
*/

class GoalsUtils {
	/**
	 * Add 'goal' to 'user'.goals
	 *
	 * @param {Object} user - user object.
	 * @param {Object} obj - partial goal object.
	 * @return {Object} Updated user.
	 * @throws {Error} if arguments are not defined
	 */
	addGoal(user, obj) {
		if (user && obj) {
			const { title, description, status } = obj;
			const goal = {
				id: this.maxGoalIdfromGoals(user.goals) + 1,
				title,
				description,
				status,
				projects: []
			};
			// console.log('ADD_USER_GOAL, newitem ', newitem);
			user.goals.push(goal);
			return;
		}
		throw Error('Exception in GoalsUtils::addGoal');
	}

	maxGoalIdfromGoals(goals) {
		return Math.max(...goals.map(o => o.id), 1);
	}

	goalsFromGoals(goals) {
		const arr = [];
		goals.forEach(goal => {
			arr.push(goal);
		});
		return arr;
	}

	goalFromGoalsById(id, goals) {
		const abc = id * 1;
		return goals.find(goal => goal.id === abc);
	}

	goalFromGoalsByProjectId(id, goals) {
		const projects = projectsUtils.projectsWithGoalFromGoals(goals);
		// console.log('goalFromGoalsByProjectId, projects ', projects);
		const goal = projects.find(item => item.project.id === id * 1);
		// console.log('goal ', goal);
		return goal;
	}

	moveGoalById(goalId, dropId, before, goals) {
		// console.log('moveGoalById, goalId ', goalId, ' dropId ', dropId, ' before ', before, ' goals ', goals);
		const moveGoal = this.goalFromGoalsById(goalId, goals);
		const arr = [];
		goals.forEach(goal => {
			if (goal.id !== goalId) {
				if (before && goal.id === dropId) {
					arr.push(moveGoal);
				}
				arr.push(goal);
				if (!before && goal.id === dropId) {
					arr.push(moveGoal);
				}
			}
		});
		return arr;
	}

	cloneGoalById(goalId, goals) {
		let maxProjectId = projectsUtils.maxProjectIdFromGoals(goals);
		let maxTaskId = tasksUtils.maxTaskIdFromGoals(goals);

		const cloneGoal = JSON.parse(JSON.stringify(this.goalFromGoalsById(goalId, goals)));
		cloneGoal.id = this.maxGoalIdfromGoals(goals) + 1;
		cloneGoal.title = `Clone_of_${cloneGoal.title}`;
		cloneGoal.projects.forEach(project => {
			const outer = project;
			maxProjectId += 1;
			outer.id = maxProjectId;
			outer.tasks.forEach(task => {
				const inner = task;
				maxTaskId += 1;
				inner.id = maxTaskId;
			});
		});

		const arr = [];
		goals.forEach(goal => {
			arr.push(goal);
			if (goal.id === goalId) {
				arr.push(cloneGoal);
			}
		});
		return arr;
	}

	updateGoalById(goalId, update, goals) {
		// console.log('updateGoalById, goalId ', goalId, ' update ', update, ' goals ', goals);
		const updateGoal = this.goalFromGoalsById(goalId, goals);
		const { title, description, status } = update;
		updateGoal.title = title;
		updateGoal.description = description;
		updateGoal.status = status;
		// console.log('updateGoal ', updateGoal);
		return goals;
	}

	goalsListOptions(goals) {
		const arr = [];
		goals.forEach(goal => {
			arr.push({ id: goal.id, title: goal.title });
		});
		return arr;
	}

	goalsListOption(id, goals) {
		const goal = this.goalFromGoalsById(id, goals);
		return goal.title;
	}
}

module.exports = GoalsUtils;
