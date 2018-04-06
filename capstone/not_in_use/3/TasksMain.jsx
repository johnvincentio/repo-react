import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { goalsType, matchType } from '../../types';
import * as taskUtilities from '../../utilities/taskUtilities';
import * as tagUtilities from '../../utilities/tagUtilities';

import Layout from '../containers/Layout';

import TasksGridViewer from './TasksGridViewer';
import EnhancedTable from '../main/tables/enhancedTable/EnhancedTable';

import ExpandableButton from '../../toolbox/ExpandableButton';

// import SimpleTable from '../main/tables/SimpleTable';

// import CustomPaginationActionsTable from '../main/tables/tablePagination/TablePagination';

import { tasksListFromGoalsByStatus, taskStatusOption } from '../../utilities/taskStatusUtilities';
import { transformObjectToUserDateString } from '../../utilities/datesUtilities';

const tableHeaders = [
	{ id: 'task', numeric: false, disablePadding: true, label: 'Task' },
	// { id: 'goal', numeric: false, disablePadding: true, label: 'Goal' },
	// { id: 'project', numeric: false, disablePadding: true, label: 'Project' },
	{ id: 'status', numeric: false, disablePadding: true, label: 'Status' },
	{ id: 'start', numeric: false, disablePadding: true, label: 'Start' },
	{ id: 'end', numeric: false, disablePadding: true, label: 'End' }
];

function prepareListViewer(tasks) {
	const tableData = [];
	tasks.forEach(item => {
		const { task } = item;
		tableData.push({
			id: task.id,
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
			{/* <CustomPaginationActionsTable /> */}
			{/* <Tasks tasks={tasks} /> */}
		</Fragment>
	);
}

class TasksMain extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- TasksMain::constructor, props ', props);
		this.state = { draggedElement: '' };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);
	}

	getDraggedElement() {
		// console.log('TasksMain::getDraggedElement, this.state.draggedElement', this.state.draggedElement);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		// console.log('TasksMain::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}

	render() {
		const { goals, datatype, grid } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- TasksMain::render, datatype ', datatype, ' param ', param);
		let tasks = [];
		switch (datatype) {
			case 'status':
				tasks = tasksListFromGoalsByStatus(param, goals);
				break;
			case 'tags':
			case 'tag':
				tasks = tagUtilities.tagsListFromGoalsByTag(param, goals);
				break;
			case 'tasks':
			default:
				tasks = taskUtilities.tasksListFromGoals(param, goals);
		}
		const div = grid ? (
			<TasksGridViewer
				tasks={tasks}
				getDraggedElement={this.getDraggedElement}
				setDraggedElement={this.setDraggedElement}
			/>
		) : (
			prepareListViewer(tasks)
		);

		return (
			<Layout datatype={datatype}>
				{div}
				<ExpandableButton />
			</Layout>
		);
	}
}

TasksMain.propTypes = {
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	match: matchType.isRequired, // eslint-disable-line react/no-typos
	datatype: PropTypes.string.isRequired,
	grid: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
	grid: state.gridReducer.grid
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksMain);
