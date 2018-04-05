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
		this.state = {
			dragging: false,
			dragEnter: false
		};
		// console.log('--- Task::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);

		this.onClickSelectTask = this.onClickSelectTask.bind(this);

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onClickSelectTask(goalId, projectId, task) {
		// console.log('Task::onClickSelectTask goalId ', goalId, ' projectId ', projectId, ' task ', task);
		this.props.actions.selectedTask(goalId, projectId, task.id);
	}

	onDragStart(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			taskId: target.getAttribute('data_task_id') * 1,
			index: target.getAttribute('data_index') * 1
		};
		console.log(
			'>>> Task::onDragStart(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement()
		);

		if (
			targetObj.type === 'task' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.projectId &&
			targetObj.taskId === this.props.task.id
		) {
			const obj = {
				type: 'task',
				goalId: this.props.goalId,
				projectId: this.props.projectId,
				taskId: this.props.task.id,
				index: targetObj.index
			};
			dataTransfer.setData('text/plain', JSON.stringify(obj));
			dataTransfer.effectAllowed = 'move';
			dataTransfer.dropEffect = 'move';

			this.setDraggedElement(obj);
			this.setState({ dragging: true });
			console.log('*** Task; Dragged element *** ', obj);
		}
		console.log(
			'<<< Task::onDragStart(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			'\n'
		);
	}

	onDragEnd(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			taskId: target.getAttribute('data_task_id') * 1,
			index: target.getAttribute('data_index') * 1
		};
		console.log(
			'>>> Task::onDragEnd(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement()
		);

		dataTransfer.clearData();

		this.setDraggedElement('');
		this.setState({ dragging: false, dragEnter: false });

		console.log(
			'<<< Task::onDragEnd(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			'\n'
		);
	}

	onDragEnter(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			taskId: target.getAttribute('data_task_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		const bounding = target.getBoundingClientRect();
		const offset = bounding.y + bounding.height / 2;
		const insertBefore = event.clientY < offset;

		console.log(
			'>>> Task::onDragEnter(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement(),
			' bounding ',
			bounding,
			' offset ',
			offset,
			' event.clientY ',
			event.clientY,
			' insertBefore ',
			insertBefore
		);

		let dragEnter = false;
		const dragged = this.getDraggedElement();
		if (
			targetObj.type === 'task' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.projectId &&
			targetObj.taskId === this.props.task.id &&
			!this.state.dragging &&
			!this.state.dragEnter
		) {
			if (
				dragged.type === 'task' &&
				(targetObj.goalId !== dragged.goalId ||
					targetObj.projectId !== dragged.projectId ||
					targetObj.taskId !== dragged.taskId)
			) {
				dragEnter = true;
			}
		}

		if (insertBefore && dragged.index + 1 === targetObj.index) {
			dragEnter = false;
		}
		if (!insertBefore && dragged.index - 1 === targetObj.index) {
			dragEnter = false;
		}

		if (dragEnter) {
			console.log(
				'*** Task; Drag Enter; goalId ',
				this.props.goalId,
				' project.id ',
				this.props.projectId,
				' task.id ',
				this.props.task.id,
				' dragEnter ',
				dragEnter
			);
			this.setState({ dragEnter: true });
			dataTransfer.dropEffect = 'move';
		}

		console.log(
			'<<< Task::onDragEnter(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			'\n'
		);
	}

	/* eslint-disable class-methods-use-this */
	onDragOver(event) {
		event.preventDefault();
		return false;
	}

	onDragLeave(event) {
		const { target } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			taskId: target.getAttribute('data_task_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		const bounding = target.getBoundingClientRect();
		const offset = bounding.y + bounding.height / 2;
		const insertBefore = event.clientY < offset;

		console.log(
			'>>> Task::onDragLeave(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement(),
			' bounding ',
			bounding,
			' offset ',
			offset,
			' event.clientY ',
			event.clientY,
			' insertBefore ',
			insertBefore
		);

		let dragLeave = false;
		const dragged = this.getDraggedElement();
		if (
			targetObj.type === 'task' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.projectId &&
			targetObj.taskId === this.props.task.id &&
			!this.state.dragging &&
			this.state.dragEnter
		) {
			if (
				dragged.type === 'task' &&
				(targetObj.goalId !== dragged.goalId ||
					targetObj.projectId !== dragged.projectId ||
					targetObj.taskId !== dragged.taskId)
			) {
				dragLeave = true;
			}
		}

		if (dragLeave) {
			console.log(
				'*** Task; Drag Leave; goalId ',
				this.props.goalId,
				' project.id ',
				this.props.projectId,
				' task.id ',
				this.props.task.id,
				' dragLeave ',
				dragLeave
			);
			this.setState({ dragEnter: false });
		}
		console.log(
			'<<< Task::onDragLeave(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			'\n'
		);
	}

	onDrop(event) {
		event.preventDefault();
		event.stopPropagation();

		const { target } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			taskId: target.getAttribute('data_task_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		const bounding = target.getBoundingClientRect();
		const offset = bounding.y + bounding.height / 2;
		const insertBefore = event.clientY < offset;

		console.log(
			'>>> Task::onDrop(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement(),
			' bounding ',
			bounding,
			' offset ',
			offset,
			' event.clientY ',
			event.clientY,
			' insertBefore ',
			insertBefore
		);

		let drop = false;
		const dragged = this.getDraggedElement();
		if (
			targetObj.type === 'task' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.projectId &&
			targetObj.taskId === this.props.task.id &&
			!this.state.dragging &&
			this.state.dragEnter
		) {
			if (
				dragged.type === 'task' &&
				(targetObj.goalId !== dragged.goalId ||
					targetObj.projectId !== dragged.projectId ||
					targetObj.taskId !== dragged.taskId)
			) {
				drop = true;
			}
		}

		if (drop) {
			this.setState({ dragging: false, dragEnter: false });

			const from = {
				type: 'task',
				goalId: dragged.goalId,
				projectId: dragged.projectId,
				taskId: dragged.taskId
			};
			const to = {
				type: 'task',
				goalId: targetObj.goalId,
				projectId: targetObj.projectId,
				taskId: targetObj.taskId
			};
			console.log('*** Move Task; from ', from, ' to ', to, ' insertBefore ', insertBefore);
			this.props.actions.moveUserObject(from, to, insertBefore);
		}

		console.log(
			'<<< Task::onDrop(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.projectId,
			' task.id ',
			this.props.task.id,
			'\n'
		);
	}

	render() {
		// console.log('Task::render(), props ', this.props);
		const { goalId, projectId, task, idx } = this.props;

		const { selectedType, selectedGoalId, selectedProjectId, selectedTaskId } = this.props.selected;
		const selectedTask =
			selectedType === 'task' &&
			selectedGoalId === goalId &&
			selectedProjectId === projectId &&
			selectedTaskId === task.id;
		// console.log(
		// 	'selectedType ', selectedType, ' selectedGoalId ', selectedGoalId, ' selectedProjectId ', selectedProjectId,
		// 	' selectedTaskId ', selectedTaskId, ' selectedTask ', selectedTask,
		// );

		const { commandedType } = this.props.command;

		const editTask = selectedTask && commandedType === 'edit';
		// console.log('commandedType ', commandedType, ' editTask ', editTask);

		const selectedClass = selectedTask ? 'task--selected' : '';

		const draggingClass = this.state.dragging ? 'task--task-dragging' : '';

		const dragEnterClass = this.state.dragEnter ? 'task--task-dragenter' : '';

		const start = dateUtilities.transformObjectToString(task.start);
		const end = dateUtilities.transformObjectToString(task.end);
		// console.log('start ', start, ' task.start ', task.start);
		// console.log('end ', end, ' task.end ', task.end);

		const tags = task.tags.map((tag, counter) => {
			// console.log('tag ', tag);
			const num = counter;
			return (
				<div className="task--card-tag" key={`task_tag_key_${goalId}_${projectId}_${task.id}_${num}`}>
					{tag}
				</div>
			);
		});

		const status = taskStatusUtilities.taskStatusOption(task.status);
		// console.log('status ', status);

		return (
			<div className="task--container">
				<button
					className={`task--task ${dragEnterClass} ${draggingClass} ${selectedClass}`}
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
					<div className="task--card">
						<header className="task--card-header">
							<div className="task--card-status">{status}</div>
							<div className="task--card-dates">
								{start} - {end}
							</div>
						</header>
						<section className="task--card-main">
							<h4>{task.title}</h4>
						</section>
						<footer className="task--card-footer">{tags}</footer>
					</div>
				</button>
				{editTask && (
					<div>
						<EditTask goalId={goalId} projectId={projectId} task={task} />
					</div>
				)}
			</div>
		);
	}
}

Task.propTypes = {
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType.isRequired, // eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	selected: selectType.isRequired, // eslint-disable-line react/no-typos
	command: commandType.isRequired, // eslint-disable-line react/no-typos

	actions: PropTypes.shape({
		updateUserTask: PropTypes.func.isRequired,
		selectedTask: PropTypes.func.isRequired,
		moveUserObject: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	selected: state.selectedReducer.selected,
	command: state.commandReducer.command
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
