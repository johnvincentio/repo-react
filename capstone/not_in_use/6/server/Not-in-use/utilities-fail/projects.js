/**
 * Utility methods to handle tasks related to projects
 *
 * @class ProjectsUtils
 */

const GoalsUtils = require('./goals');

const goalsUtils = new GoalsUtils();

const TasksUtils = require('./tasks');

const tasksUtils = new TasksUtils();

/* eslint-disable class-methods-use-this */

class ProjectsUtils {
	projectsFromGoals(goals) {
		const arr = [];
		goals.forEach(goal => {
			goal.projects.forEach(project => arr.push(project));
		});
		return arr;
	}

	projectsWithGoalFromGoals(goals) {
		const arr = [];
		goals.forEach(goal => {
			goal.projects.forEach(project => arr.push({ project, goal }));
		});
		return arr;
	}

	projectFromGoalsById(id, goals) {
		const abc = id * 1;
		const arr = this.projectsFromGoals(goals);
		return arr.find(project => project.id === abc);
	}

	projectFromProjectsById(projectId, projects) {
		const abc = projectId * 1;
		return projects.find(project => project.id === abc);
	}

	projectFromGoalsByIds(goalId, projectId, goals) {
		const goal = goalsUtils.goalFromGoalsById(goalId, goals);
		// console.log('goal', goal);
		return this.projectFromProjectsById(projectId, goal.projects);
	}

	maxProjectIdFromGoals(goals) {
		const projects = this.projectsFromGoals(goals);
		return Math.max(...projects.map(o => o.id), 1);
	}

	moveProjectById(from, to, before, goals) {
		// console.log('moveProjectById, from ', from, ' to ', to, 'before ', before, ' goals ', goals);
		const moveProject = this.projectFromGoalsById(from.projectId, goals);
		// console.log('moveProject ', moveProject);
		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				if (from.goalId !== goal.id || from.projectId !== project.id) {
					if (before && goal.id === to.goalId && project.id === to.projectId) {
						// move project here
						arr.push(moveProject);
					}
					arr.push(project);
					if (!before && goal.id === to.goalId && project.id === to.projectId) {
						// move project here
						arr.push(moveProject);
					}
				}
			});
			outer.projects = arr;
		});
		// console.log('goals ', goals);
		return goals;
	}

	moveProjectToGoal(from, to, goals) {
		// console.log('moveProjectToGoal, from ', from, ' to ', to, ' goals ', goals);
		const moveProject = this.projectFromGoalsById(from.projectId, goals);
		// console.log('moveProject ', moveProject);
		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				if (from.goalId !== goal.id || from.projectId !== project.id) {
					arr.push(project);
				}
			});
			outer.projects = arr;
			if (goal.id === to.goalId) {
				goal.projects.push(moveProject);
			}
		});
		// console.log('goals ', goals);
		return goals;
	}

	deleteProjectByGoalIdProjectId(goalId, projectId, goals) {
		// console.log('deleteProjectByGoalIdProjectId, goalId ', goalId, ' projectId ', projectId, ' goals ', goals);
		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				if (goalId !== goal.id || projectId !== project.id) {
					arr.push(project);
				}
			});
			outer.projects = arr;
		});
		// console.log('goals ', goals);
		return goals;
	}

	cloneProjectById(goalId, projectId, goals) {
		// console.log('cloneProjectById, goalId ', goalId, ' projectId ', projectId, ' goals ', goals);
		const cloneProject = JSON.parse(JSON.stringify(this.projectFromGoalsById(projectId, goals)));
		cloneProject.id = this.maxProjectIdFromGoals(goals) + 1;
		cloneProject.title = `Clone_of_${cloneProject.title}`;
		cloneProject.tasks = tasksUtils.cloneTasks(goalId, projectId, goals);

		goals.forEach(goal => {
			const outer = goal;
			const arr = [];
			outer.projects.forEach(project => {
				arr.push(project);
				if (goalId === goal.id && projectId === project.id) {
					arr.push(cloneProject);
				}
			});
			outer.projects = arr;
		});
		// console.log('cloneProjectById, goals ', goals);
		return goals;
	}

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
	}

	projectsListOptions(goalId, goals) {
		// console.log('---projectsListOptions, goalId ', goalId);
		const arr = [];
		const goal = goalsUtils.goalFromGoalsById(goalId, goals);
		goal.projects.forEach(project => {
			arr.push({ id: project.id, title: project.title });
		});
		// console.log('arr ', arr);
		return arr;
	}

	projectsListOption(goalId, projectId, goals) {
		// console.log('---projectsListOption, goalId ', goalId, ' projectId ', projectId);
		const project = this.projectFromGoalsByIds(goalId, projectId, goals);
		// console.log('projectsListOption, project ', project);
		return project.id;
	}
}

module.exports = ProjectsUtils;
