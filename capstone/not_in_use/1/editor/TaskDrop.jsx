
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { taskType } from '../../types';

class TaskDrop extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- TaskDrop::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onDragEnter(event) {
		const { target } = event;
		const draggedElement = this.getDraggedElement();
		console.log('TaskDrop::onDragEnter, target ', target, ' draggedElement ', draggedElement);

		const drop = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			taskId: target.getAttribute('data_task_id') * 1,
			orderId: target.getAttribute('data_order_id') * 1,
		};
		const drag = {
			type: draggedElement.getAttribute('data_type'),
			goalId: draggedElement.getAttribute('data_goal_id') * 1,
			projectId: draggedElement.getAttribute('data_project_id') * 1,
			taskId: draggedElement.getAttribute('data_task_id') * 1,
			orderId: draggedElement.getAttribute('data_order_id') * 1,
		};
		console.log('TaskDrop::onDragEnter, drag ', drag, ' drop ', drop);

		const diff = Math.abs(drag.orderId - drop.orderId);
		console.log(' diff ', diff);

		if (drop.type === drag.type && (diff > 1 || drop.projectId !== drag.projectId)) {
			target.className = 'task-drop--dropping ';
		}
	}
	/* eslint-disable class-methods-use-this */
	onDragOver(event) {
		event.preventDefault();
	}

	onDragLeave(event) {
		const { target } = event;
		// console.log('TaskDrop::onDragLeave, target ', target);
		target.className = 'task-drop--droppable';
	}

	onDrop(event) {
		event.preventDefault();
		const { target } = event;
		const draggedElement = this.getDraggedElement();
		console.log('TaskDrop::onDragEnter, target ', target, ' draggedElement ', draggedElement);

		const drop = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			taskId: target.getAttribute('data_task_id') * 1,
			orderId: target.getAttribute('data_order_id') * 1,
		};
		const drag = {
			type: draggedElement.getAttribute('data_type'),
			goalId: draggedElement.getAttribute('data_goal_id') * 1,
			projectId: draggedElement.getAttribute('data_project_id') * 1,
			taskId: draggedElement.getAttribute('data_task_id') * 1,
			orderId: draggedElement.getAttribute('data_order_id') * 1,
		};
		console.log('TaskDrop::onDragEnter, drag ', drag, ' drop ', drop);

		target.className = 'task-drop--droppable';
		this.props.actions.moveUserTask(drag, drop);
	}

	/* eslint-disable object-curly-newline */
	render() {
		// console.log('TaskDrop::render(), props ', this.props);
		const { goalId, projectId, task, idx } = this.props;
		const count = (idx * 2) + 1;
		return (
			<div
				className="task-drop--droppable"
				data_type="task"
				data_goal_id={goalId}
				data_project_id={projectId}
				data_task_id={task.id}
				data_order_id={count}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			/>
		);
	}
}

TaskDrop.propTypes = {
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,

	actions: PropTypes.shape({
		moveUserTask: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(TaskDrop);
