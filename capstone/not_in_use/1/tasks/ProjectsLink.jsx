
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { goalsType } from '../../types';
import * as actions from '../../actions/';
import * as projectUtilities from '../../utilities/projects';

class ProjectsLink extends React.Component {
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- ProjectsLink::constructor ', props);
		// this.onClickSelectGoal = this.onClickSelectGoal.bind(this);
	}
	// onClickSelectGoal(item) {
	// 	console.log('--- onClickSelectGoal ', item);
	// }

	render() {
		// console.log('ProjectsLink::render(), props ', this.props);
		const arr = projectUtilities.projectsFromGoals(this.props.goals);
		// console.log('arr ', arr);
		const links = arr.map(project => (
			<div key={project.id}>
				<Link to={`/project/${project.id}`}>
					<button>{project.description}</button>
				</Link>
			</div>
		));
		return links;
	}
}

ProjectsLink.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsLink);

/*
<button onClick={() => this.onClickSelectGoal(project)}>{project.description}</button>
*/
/*
const arr = [];
this.props.goals.forEach(goal => {
	console.log('ProjectsLink::render(), foreach, goal ', goal);
	goal.projects.forEach(project => {
		arr.push(project.project);
	});
});

renderProject(project) {
		console.log('ProjectsLink::renderProject, project ', project);
		const jv = JSON.parse(JSON.stringify(project));
		console.log('jv ', jv);
		return (
			<div key={project.id} >
			<div>:::{jv.des-cription}:::</div>
				<Link to={`/projects/${project.id}`}>
					<button onClick={() => this.onClickSelectGoal(project)}>testing{project.description}</button>
				</Link>
			</div>
		);
	}
	renderGoal(goal) {
		console.log('ProjectsLink::renderGoal, goal ', goal);
		return goal.projects.map((item) => {
			const abc = this.renderProject(item);
			console.log('abc ', abc);
			return abc;
		});
	}
*/
/*
const jv2 = this.props.goals.map((goal) => {
	return goal.projects.map(project => this.renderProject(project));
	return this.renderGoal(goal);

	return (
		<div key={item.id} >
			<Link to={`/goals/${item.id}`}>
				<button onClick={() => this.onClickSelectGoal(item)}>{item.description}</button>
			</Link>
		</div>
	);
});
*/
/*
	this.props.goals.map((goal) => {
		// arr.push(...goal.projects);
		// arr.push(goal.projects);
		console.log('ProjectsLink::render(), goal.projects ', goal.projects);
		arr.concat(goal.projects);
	});
*/
