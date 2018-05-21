import * as projectUtilities from './projectUtilities';
import * as taskUtilities from './taskUtilities';

export function maxGoalIdfromGoals(goals) {
	return Math.max(...goals.map(o => o.goalid), 1);
}

export function goalsFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		arr.push(goal);
	});
	return arr;
}

export function goalFromGoalsById(id, goals) {
	const abc = id * 1;
	return goals.find(goal => goal.goalid === abc);
}

export function goalFromGoalsByProjectId(id, goals) {
	const projects = projectUtilities.projectsWithGoalFromGoals(goals);
	// console.log('goalFromGoalsByProjectId, projects ', projects);
	const goal = projects.find(item => item.project.projectid === id * 1);
	// console.log('goal ', goal);
	return goal;
}

export function moveGoalById(goalId, dropId, before, goals) {
	// console.log('moveGoalById, goalId ', goalId, ' dropId ', dropId, ' before ', before, ' goals ', goals);
	const moveGoal = goalFromGoalsById(goalId, goals);
	const arr = [];
	goals.forEach(goal => {
		if (goal.goalid !== goalId) {
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
}

export function cloneGoalById(goalId, goals) {
	let maxProjectId = projectUtilities.maxProjectIdFromGoals(goals);
	let maxTaskId = taskUtilities.maxTaskIdFromGoals(goals);

	const cloneGoal = JSON.parse(JSON.stringify(goalFromGoalsById(goalId, goals)));
	cloneGoal.goalid = maxGoalIdfromGoals(goals) + 1;
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
}

export function updateGoalById(goalId, update, goals) {
	// console.log('updateGoalById, goalId ', goalId, ' update ', update, ' goals ', goals);
	const updateGoal = goalFromGoalsById(goalId, goals);
	const { title, description, status } = update;
	updateGoal.title = title;
	updateGoal.description = description;
	updateGoal.status = status;
	// console.log('updateGoal ', updateGoal);
	return goals;
}

export function goalsListOptions(goals) {
	const arr = [];
	goals.forEach(goal => {
		arr.push({ id: goal.goalid, title: goal.title });
	});
	return arr;
}

export function goalsListOption(id, goals) {
	const goal = goalFromGoalsById(id, goals);
	return goal.title;
}

// function maxSeq(goals) {
// 	return Math.max(...goals.map(o => o.seq), 1);
// }

// export function JVgoalsFromGoals(goals) {
// 	const arr = [];
// 	goals.forEach((goal) => {
// 		arr.push(goal);
// 	});
// 	return arr;
// }
