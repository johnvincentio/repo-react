/**
 * Utility methods to handle tasks related to search
 *
 * @class searchUtils
 */

/* eslint-disable class-methods-use-this */

const searchUtils = {
	/**
	 * Add 'goal' to 'user'.goals
	 *
	 * @param {Object} user - user object.
	 * @param {Object} obj - partial goal object.
	 * @return {Object} Updated user.
	 * @throws {Error} if arguments are not defined
	 */

	searchString(find, target) {
		if (find == null || target == null) {
			return null;
		}
		return target.toLowerCase().indexOf(find) > -1;
	},

	search(query, goals) {
		const lowerQuery = query.toLowerCase();

		const filtered = goals.filter(goal => {
			if (
				this.searchString(lowerQuery, goal.title) ||
				this.searchString(lowerQuery, goal.description)
			) {
				return true;
			}
			const filteredProjects = goal.projects.filter(project => {
				if (
					this.searchString(lowerQuery, project.title) ||
					this.searchString(lowerQuery, project.description)
				) {
					return true;
				}
				const filteredTasks = project.tasks.filter(task => {
					if (
						this.searchString(lowerQuery, task.title) ||
						this.searchString(lowerQuery, task.description)
					) {
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
};

module.exports = searchUtils;
