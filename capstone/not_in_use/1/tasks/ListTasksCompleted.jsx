
import React from 'react';
import { connect } from 'react-redux';

import OpenMenu from '../OpenMenu';
import Tasks from './Tasks';
import { goalsType } from '../../types';
import * as taskUtilities from '../../utilities/tasks';

class ListTasksCompleted extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- ListTasksCompleted::constructor, props ', props);
	}
	render() {
		// console.log('--- ListTasksCompleted::render, props ', this.props);
		const tasks = taskUtilities.tasksCompletedListFromGoals(this.props.goals);
		// console.log('--- ListTasksCompleted, tasks ', tasks);
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

ListTasksCompleted.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(ListTasksCompleted);
