//

export function searchString(find, target) {
	if (find == null || target == null) {
		return null;
	}
	return target.toLowerCase().indexOf(find) > -1;
}

export function search(query, goals) {
	const lowerQuery = query.toLowerCase();

	const filtered = goals.filter(goal => {
		if (searchString(lowerQuery, goal.title) || searchString(lowerQuery, goal.description)) {
			return true;
		}
		const filteredProjects = goal.projects.filter(project => {
			if (searchString(lowerQuery, project.title) || searchString(lowerQuery, project.description)) {
				return true;
			}
			const filteredTasks = project.tasks.filter(task => {
				if (searchString(lowerQuery, task.title) || searchString(lowerQuery, task.description)) {
					return true;
				}
				return false;
			});
			project.tasks = filteredTasks;
			if (project.tasks.length < 1) {
				return false;
			}
			return true;
		});
		goal.projects = filteredProjects;
		if (goal.projects.length < 1) {
			return false;
		}
		return true;
	});
	return filtered;
}
