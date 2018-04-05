
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import OpenMenu from '../OpenMenu';
import Tasks from './Tasks';

import { goalsType, matchType } from '../../types';
import * as taskUtilities from '../../utilities/taskUtilities';
import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as tagUtilities from '../../utilities/tagUtilities';

class TasksMain extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- TasksMain::constructor, props ', props);
		this.props.actions.OpenSidebar();
	}

	render() {
		const { goals, selected } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- TasksMain::render, selected ', selected, ' param ', param);
		let tasks = [];
		switch (selected) {
			case 'status':
				tasks = taskStatusUtilities.tasksListFromGoalsByStatus(param, goals);
				break;
			case 'tags':
			case 'tag':
				tasks = tagUtilities.tagsListFromGoalsByTag(param, goals);
				break;
			case 'tasks':
			default:
				tasks = taskUtilities.tasksListFromGoals(param, goals);
		}
		// console.log('--- TasksMain::render, tasks ', tasks);
		return (
			<div>
				<section>
					<div>
						<OpenMenu />
						<Tasks tasks={tasks} />
					</div>
				</section>
			</div>
		);
	}
}

TasksMain.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
	match: matchType.isRequired,	// eslint-disable-line react/no-typos
	selected: PropTypes.string.isRequired,
	actions: PropTypes.shape({
		OpenSidebar: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksMain);
