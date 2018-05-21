import * as goalUtilities from './goalUtilities';
import * as taskUtilities from './taskUtilities';

export function projectsFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => arr.push(project));
	});
	return arr;
}

export function projectsWithGoalFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => arr.push({ project, goal }));
	});
	return arr;
}

export function projectFromGoalsById(id, goals) {
	const abc = id * 1;
	const arr = projectsFromGoals(goals);
	return arr.find(project => project.projectid === abc);
}

export function projectFromProjectsById(projectId, projects) {
	const abc = projectId * 1;
	return projects.find(project => project.projectid === abc);
}

export function projectFromGoalsByIds(goalId, projectId, goals) {
	const goal = goalUtilities.goalFromGoalsById(goalId, goals);
	// console.log('goal', goal);
	return projectFromProjectsById(projectId, goal.projects);
}

export function maxProjectIdFromGoals(goals) {
	const projects = projectsFromGoals(goals);
	return Math.max(...projects.map(o => o.projectid), 1);
}

export function moveProjectById(from, to, before, goals) {
	// console.log('moveProjectById, from ', from, ' to ', to, 'before ', before, ' goals ', goals);
	const moveProject = projectFromGoalsById(from.projectId, goals);
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
}

export function moveProjectToGoal(from, to, goals) {
	// console.log('moveProjectToGoal, from ', from, ' to ', to, ' goals ', goals);
	const moveProject = projectFromGoalsById(from.projectId, goals);
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
}

export function deleteProjectByGoalIdProjectId(goalId, projectId, goals) {
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
}

export function cloneProjectById(goalId, projectId, goals) {
	// console.log('cloneProjectById, goalId ', goalId, ' projectId ', projectId, ' goals ', goals);
	const cloneProject = JSON.parse(JSON.stringify(projectFromGoalsById(projectId, goals)));
	cloneProject.projectid = maxProjectIdFromGoals(goals) + 1;
	cloneProject.title = `Clone_of_${cloneProject.title}`;
	cloneProject.tasks = taskUtilities.cloneTasks(goalId, projectId, goals);

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
}

export function updateProjectById(goalId, projectId, update, goals) {
	// console.log('updateProjectById, update ', update, ' goals ', goals);
	const updateProject = projectFromGoalsByIds(goalId, projectId, goals);
	const { title, description, status } = update;
	updateProject.title = title;
	updateProject.description = description;
	updateProject.status = status;
	// updateProject[update.field] = update.value;
	// console.log('updateProject ', updateProject);
	return goals;
}

export function projectsListOptions(goalId, goals) {
	// console.log('---projectsListOptions, goalId ', goalId);
	const arr = [];
	const goal = goalUtilities.goalFromGoalsById(goalId, goals);
	goal.projects.forEach(project => {
		arr.push({ id: project.projectid, title: project.title });
	});
	// console.log('arr ', arr);
	return arr;
}

export function projectsListOption(goalId, projectId, goals) {
	// console.log('---projectsListOption, goalId ', goalId, ' projectId ', projectId);
	const project = projectFromGoalsByIds(goalId, projectId, goals);
	// console.log('projectsListOption, project ', project);
	return project.projectid;
}
