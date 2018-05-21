import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/';
import { tasksType } from '../../types';
import ListTask from './ListTask';

class ListTasks extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ListTasks::constructor ', props);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
	}

	render() {
		// console.log('ListTasks::render() props ', this.props);
		const { goalId, projectId, tasks } = this.props;
		const div = tasks.map((task, idx) => (
			// console.log('task ', task);
			<ListTask
				key={`task_key_${goalId}_${projectId}_${task.taskid}`}
				goalId={goalId}
				projectId={projectId}
				task={task}
				idx={idx}
				getDraggedElement={this.getDraggedElement}
				setDraggedElement={this.setDraggedElement}
			/>
		));
		return <div className="list-tasks--container">{div}</div>;
	}
}

ListTasks.propTypes = {
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	tasks: tasksType.isRequired, // eslint-disable-line react/no-typos
	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(ListTasks);
