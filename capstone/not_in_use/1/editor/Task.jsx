
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { taskType, selectType, commandType } from '../../types';

import EditTask from './EditTask';

import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as dateUtilities from '../../utilities/datesUtilities';

class Task extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- Task::constructor ', props);

		this.setDraggedElement = this.props.setDraggedElement.bind(this);

		this.onClickSelectTask = this.onClickSelectTask.bind(this);

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onClickSelectTask(goalId, projectId, task) {
		// console.log('Task::onClickSelectTask goalId ', goalId, ' projectId ', projectId, ' task ', task);
		this.props.actions.selectedTask(goalId, projectId, task.id);
	}

	onDragStart(event) {
		const { target, dataTransfer } = event;
		console.log('Task::onDragStart(), target ', target);
		target.className = 'task--task-dragging';
		this.setDraggedElement(target);
		dataTransfer.setData('text', target);
		dataTransfer.effectAllowed = 'move';
	}

	onDragEnd(event) {
		const { target, dataTransfer } = event;
		console.log('Task::onDragEnd(), target ', target);
		target.className = 'task--task';
		this.setDraggedElement('');
		dataTransfer.clearData();
	}

	render() {
		// console.log('Task::render(), props ', this.props);
		const {
			goalId, projectId, task, idx,
		} = this.props;
		const count = (idx + 1) * 2;

		const {
			selectedType, selectedGoalId, selectedProjectId, selectedTaskId,
		} = this.props.selected;
		const selectedTask = selectedType === 'task' &&
														selectedGoalId === goalId &&
														selectedProjectId === projectId &&
														selectedTaskId === task.id;
		// console.log(
		// 	'selectedType ', selectedType, ' selectedGoalId ', selectedGoalId, ' selectedProjectId ', selectedProjectId,
		// 	' selectedTaskId ', selectedTaskId, ' selectedTask ', selectedTask,
		// );

		const { commandedType } = this.props.command;

		const editTask = (selectedTask && commandedType === 'edit');
		// console.log('commandedType ', commandedType, ' editTask ', editTask);

		const selectedClass = selectedTask ? 'task--selected' : '';

		const start = dateUtilities.transformObjectToString(task.start);
		const end = dateUtilities.transformObjectToString(task.end);
		// console.log('start ', start, ' task.start ', task.start);
		// console.log('end ', end, ' task.end ', task.end);

		const tags = task.tags.map((tag, idx) => {
			// console.log('tag ', tag);
			return (
				<div className="task--card-tag" key={`task_tag_key_${goalId}_${projectId}_${task.id}_${idx}`}>
					{tag}
				</div>
			);
		});

		const status = taskStatusUtilities.taskStatusOption(task.status);
		// console.log('status ', status);

		return (
			<div className="task--container">
				<button
					className={`task--task ${selectedClass}`}
					data_type="task"
					data_goal_id={goalId}
					data_project_id={projectId}
					data_task_id={task.id}
					data_order_id={count}
					draggable="true"
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
					onClick={() => this.onClickSelectTask(goalId, projectId, task)}
				>
					<div className="task--card">
						<header className="task--card-header">
							<div className="task--card-status">{status}</div>
							<div className="task--card-dates">{start} - {end}</div>
						</header>
						<section className="task--card-main">
							<h4>{task.description}</h4>
						</section>
						<footer className="task--card-footer">
							{tags}
						</footer>
					</div>
					{/* <div className="task--task-text">
					</div> */}
					{/* <div className="task--task-text">{taskStatusUtilities.taskStatusOption(task.status)}</div> */}
					{/* <div className="task--task-text">{task.comments}</div> */}
				</button>
				{editTask &&
					<div>
						<EditTask goalId={goalId} projectId={projectId} task={task} />
					</div>
				}
			</div>
		);
	}
}

Task.propTypes = {
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	setDraggedElement: PropTypes.func.isRequired,

	selected: selectType.isRequired,		// eslint-disable-line react/no-typos
	command: commandType.isRequired,		// eslint-disable-line react/no-typos

	actions: PropTypes.shape({
		updateUserTask: PropTypes.func.isRequired,
		selectedTask: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	selected: state.selectedReducer.selected,
	command: state.commandReducer.command,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
