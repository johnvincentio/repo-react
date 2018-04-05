
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { goalsType } from '../../types';
import * as actions from '../../actions/';

import * as projectUtilities from '../../utilities/projectUtilities';
import * as tagUtilities from '../../utilities/tagUtilities';
import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';

// import SimpleGoalsLink from './SimpleGoalsLink';
// import SimpleProjectsLink from './SimpleProjectsLink';

const taskOptions = [
	{ text: 'all', title: 'All' },
	{ text: 'scheduled', title: 'Scheduled' },
	{ text: 'events', title: 'Events' },
	{ text: 'late', title: 'Late' },
];

const calendarOptions = [
	{ text: 'all', title: 'All' },
	{ text: 'scheduled', title: 'Scheduled' },
	{ text: 'events', title: 'Events' },
];

function taskLinks(param) {
	// console.log('taskLinks, props ', this.props);
	const links = taskOptions.map(item => (
		<div key={`${param}-${item.text}`}>
			<Link to={`/${param}/${item.text}`}>
				<button>{item.title}</button>
			</Link>
		</div>
	));
	return links;
}

function statusLinks(param) {
	// console.log('statusLinks, props ', this.props);
	const arr = taskStatusUtilities.taskStatusLinks();
	// console.log('arr ', arr);
	const links = arr.map(item => (
		<div key={`${param}-${item.text}`}>
			<Link to={`/${param}/${item.text}`}>
				<button>{item.title}</button>
			</Link>
		</div>
	));
	return links;
}

function calendarLinks() {
	// console.log('calendarLinks, props ', this.props);
	const links = calendarOptions.map(item => (
		<div key={`calendar-${item.text}`}>
			<Link to={`/calendar/${item.text}`}>
				<button>{item.title}</button>
			</Link>
		</div>
	));
	return links;
}

class SidebarRight extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
	}

	tagLinks(param) {
		// console.log('tagLinks::render(), props ', this.props);
		const arr = tagUtilities.uniqueTagsFromGoals(this.props.goals);
		// console.log('arr ', arr);
		const links = arr.map(tag => (
			<li key={`${param}-${tag}`} >
				<Link to={`/${param}/${tag}`}>
					<button>{tag}</button>
				</Link>
			</li>
		));
		return links;
	}

	goalsLinks() {
		const links = this.props.goals.map(item => (
			<div key={item.id} >
				<Link to={`/goal/${item.id}`}>
					<button>{item.description}</button>
				</Link>
			</div>
		));
		return links;
	}

	projectsLinks() {
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

	staticLinks(param) {
		const addGoal = param === 'goals' || param === 'goal';
		if (addGoal) {
			return (
				<ul>
					<li><Link to="/add/goal/">Add Goal</Link></li>
				</ul>
			);
		}

		if (param === 'projects' || param === 'project') {
			return (
				<div />
			);
		}
		const tags = this.tagLinks('tag');
		// const cal = calendarLinks();
		const status = statusLinks('status');
		const tasks = taskLinks('tasks');
		return (
			<ul>
				<li>Today</li>
				<li>Upcoming</li>
				<li>Overdue</li>
				<li>Scheduled</li>
				{/* <li><Link to="/status/">Status</Link></li>
				<li><Link to="/tags/">Tags</Link></li> */}
				{/* {tasks} */}
				<ul>{status}</ul>
				<ul>{tags}</ul>
			</ul>
		);
	}

	render() {
		const { selected } = this.props;
		// console.log('SideBarRight, props ', props, ' selected ', selected);
		return this.staticLinks(selected);
/*
		switch (selected) {
			case 'goals':
			case 'goal':
				return this.goalsLinks();
			case 'projects':
			case 'project':
				return this.projectsLinks();

			case 'tasks':
				return taskLinks('tasks');

			case 'tags':
			case 'tag':
				return this.tagLinks('tag');

			case 'status':
				return statusLinks('status');

			case 'calendar':
				return calendarLinks();

			case 'none':
			default:
				return <div>none</div>;
		}
*/
	}
}

SidebarRight.propTypes = {
	selected: PropTypes.string.isRequired,
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarRight);

/*
// case 'simple-goals':
// case 'simple-goal':
// 	return <SimpleGoalsLink />;
// case 'simple-projects':
// case 'simple-project':
// 	return <SimpleProjectsLink />;

// case 'full-tasks':
// 	return taskLinks('full/tasks');

// case 'full-tags':
// case 'full-tag':
// 	return this.tagLinks('full/tag');

// case 'full-status':
// 	return statusLinks('full/status');
*/
