import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { taskListType, selectType, commandType } from '../../types';

import TaskEditViewer from './TaskEditViewer';

import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as dateUtilities from '../../utilities/datesUtilities';

class TaskCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dragging: false,
			dragEnter: false
		};
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);

		this.onClickSelectTask = this.onClickSelectTask.bind(this);
	}

	onClickSelectTask(goalId, projectId, task) {
		// console.log('TaskCard::onClickSelectTask goalId ', goalId, ' projectId ', projectId, ' task ', task);
		this.props.actions.selectedTask(goalId, projectId, task.id);
	}

	render() {
		// console.log('--- TaskCard, props ', this.props);
		const { taskList, idx } = this.props;
		const { goal, project, task } = taskList;
		const goalId = goal.id;
		const projectId = project.id;

		const { selectedType, selectedGoalId, selectedProjectId, selectedTaskId } = this.props.selected;
		const selectedTask =
			selectedType === 'task' &&
			selectedGoalId === goalId &&
			selectedProjectId === projectId &&
			selectedTaskId === task.id;

		const { commandedType } = this.props.command;

		const editTask = selectedTask && commandedType === 'edit';
		// console.log('commandedType ', commandedType, ' editTask ', editTask);

		const start = dateUtilities.transformObjectToUserDateString(task.start);
		const end = dateUtilities.transformObjectToUserDateString(task.end);
		// console.log('start ', start, ' task.start ', task.start);
		// console.log('end ', end, ' task.end ', task.end);

		const selectedClass = selectedTask ? 'taskviewer--selected' : '';

		const draggingClass = this.state.dragging ? 'taskviewer--task-dragging' : '';

		const dragEnterClass = this.state.dragEnter ? 'taskviewer--task-dragenter' : '';

		const status = taskStatusUtilities.taskStatusOption(task.status);

		if (editTask) {
			return <TaskEditViewer goalId={goalId} projectId={projectId} task={task} />;
		}
		return (
			<button
				className={`taskviewer--card ${dragEnterClass} ${draggingClass} ${selectedClass}`}
				data_type="task"
				data_goal_id={goalId}
				data_project_id={projectId}
				data_task_id={task.id}
				data_index={idx}
				draggable="true"
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
				onClick={() => this.onClickSelectTask(goalId, projectId, task)}
			>
				<div className="taskviewer--card-status">{status}</div>
				<div className="taskviewer--card-main">
					<div className="taskviewer--card-description">{task.description}</div>
				</div>
				<div className="taskviewer--card-start-date">{start}</div>
				<div className="taskviewer--card-end-date">{end}</div>
			</button>
		);
	}
}

TaskCard.propTypes = {
	taskList: taskListType.isRequired, // eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	selected: selectType.isRequired, // eslint-disable-line react/no-typos
	command: commandType.isRequired, // eslint-disable-line react/no-typos

	actions: PropTypes.shape({
		selectedTask: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	selected: state.selectedReducer.selected,
	command: state.commandReducer.command
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
