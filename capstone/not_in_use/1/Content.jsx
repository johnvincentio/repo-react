
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OpenMenu from './OpenMenu';

import * as actions from '../../actions/';

import * as goalUtilities from '../../utilities/goals';
import * as projectUtilities from '../../utilities/projects';

class Content extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- Content::constructor, props ', props);
	}

	handleGoals() {
		console.log('--- Content::handleGoals, props ', this.props);
		const arr = goalUtilities.goalsFromGoals(this.props.data.goals);
		const id = this.props.match.params.goalId;
		console.log('find goal id ', id);
		if (id === 'all') {
			return arr.map(goal => this.renderGoal(goal));
		}
		const abc = id * 1;
		const goal = this.props.data.goals.find(subItem => subItem.id === abc);
		console.log('goal ', goal);
		return this.renderGoal(goal);
	}

	handleProjects() {
		console.log('Content::handleProjects, props ', this.props);
		const arr = projectUtilities.projectsFromGoals(this.props.data.goals);
		console.log('arr ', arr);
		const id = this.props.match.params.projectId;
		console.log('find project id ', id);
		if (id === 'all') {
			return arr.map(project => this.renderProject(project));
		}
		const abc = id * 1;
		const project = projectUtilities.projectFromGoalsById(abc, this.props.data.goals);
		console.log('Content::handleProjects, project ', project);
		return this.renderProject(project);
	}

	renderGoal(goal) {
		console.log('--- Content::renderGoal, goal ', goal);
		const projects = goal.projects.map(project => this.renderProject(project));
		console.log('Content::renderGoal, projects ', projects);
		return (
			<div key={`goal-${goal.id}`} >
				{goal.text}
				{projects}
			</div>
		);
	}

	renderProject(project) {
		console.log('--- Content::renderProject, project ', project);
		const tasks = project.tasks.map((task) => {
			// console.log('tasks loop, task ', task);
			// console.log('tasks loop, task.text ', task.text);
			return (
				<div key={`task-${project.id}-${task.id}`}>{task.text}</div>
			);
		});
		console.log('tasks ', tasks);
		return (
			<div key={`project-${project.id}`} >
				{project.text}
				<div>{tasks}</div>
			</div>
		);
	}

	render() {
		console.log('--- Content::render, props ', this.props);
		return (
			<div>
				<section>
					<div>
						<OpenMenu />

						<div>
							<hr></hr>
							{this.props.selected === 'goals' &&
								this.handleGoals()
							}
							{this.props.selected === 'projects' &&
								this.handleProjects()
							}
							{this.props.selected === 'none' &&
								<div>TODO - build tasks</div>
							}
							<hr></hr>
						</div>

					</div>

				</section>
			</div>
		);
	}
}

Content.propTypes = {
	selected: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	data: state.dataReducer,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);

// renderAllProjects() {
// 	return this.props.data.goals.map((goal) => {
// 		console.log('Content::renderAllProjects, goal ', goal);
// 		return goal.projects.map(project => this.renderProject(project));
// 	});
// 	// return this.props.data.tasks.projects.map(project => this.renderProject(project));
// }

// jvrender() {
// 	console.log('--- Content::render, props ', this.props);
// 	return (
// 		<div>no content for now</div>
// 	);
// }
/*
	renderAllProjects() {
		const jv = this.props.data.tasks.projects.map((project) => {
			const tasks = project.tasks.map((task) => {
				// console.log('tasks loop, task ', task);
				// console.log('tasks loop, task.text ', task.text);
				return (
					<div key={`task-${project.project.id}-${task.id}`}>{task.text}</div>
				);
			});
			// console.log('tasks ', tasks);
			// console.log('project ', project);
			return (
				<div key={`project-${project.project.id}`} >
					{project.project.text}
					<div>{tasks}</div>
				</div>
			);
		});
		// console.log('renderProjects; jv ', jv);
		return jv;
	}
*/
/*
	jv() {
		const { selected } = this.props;
		console.log('Content:: jv props ', this.props, ' selected ', selected);
		switch (selected) {
			case 'goals':
				// return <div>goals</div>;
				return this.renderGoals();
			case 'projects':
				return this.renderProjects();
			case 'none':
			default:
				return <div>none</div>;
		}
	}
*/
/*
	isNone() {
		return this.props.selected === 'none';
	}
	isGoals() {
		return this.props.selected === 'goals';
	}
	isProjects() {
		return this.props.selected === 'projects';
	}
*/
