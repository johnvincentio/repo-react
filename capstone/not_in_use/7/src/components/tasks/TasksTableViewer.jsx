//

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/';

import { tasksListType } from '../../types';

import { EnhancedTable } from './tables';

import { taskStatusOption } from '../../utilities/taskStatusUtilities';
import { transformObjectToUserDateString } from '../../utilities/datesUtilities';

const tableHeaders = [
	{ id: 'task', numeric: false, disablePadding: true, label: 'Task' },
	// { id: 'goal', numeric: false, disablePadding: true, label: 'Goal' },
	// { id: 'project', numeric: false, disablePadding: true, label: 'Project' },
	{ id: 'status', numeric: false, disablePadding: true, label: 'Status' },
	{ id: 'start', numeric: false, disablePadding: true, label: 'Start' },
	{ id: 'end', numeric: false, disablePadding: true, label: 'End' }
];

class TasksTableViewer extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- TasksTableViewer::constructor, props ', props);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
	}

	render() {
		const { tasksList } = this.props;
		const tableData = [];
		tasksList.forEach(item => {
			const { task } = item;
			tableData.push({
				id: task.taskid,
				task: task.title,
				// goal: goal.title,
				// project: project.title,
				status: taskStatusOption(task.status),
				start: transformObjectToUserDateString(task.start),
				end: transformObjectToUserDateString(task.end)
			});
		});

		return (
			<Fragment>
				<EnhancedTable tableHeaders={tableHeaders} tableData={tableData} rowsPerPage={10} />
			</Fragment>
		);
	}
}

TasksTableViewer.propTypes = {
	tasksList: tasksListType.isRequired, // eslint-disable-line react/no-typos
	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(TasksTableViewer);
