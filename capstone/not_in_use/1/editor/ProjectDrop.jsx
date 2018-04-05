
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { projectType } from '../../types';

class ProjectDrop extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ProjectDrop::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onDragEnter(event) {
		const { target } = event;
		const draggedElement = this.getDraggedElement();
		console.log('ProjectDrop::onDragEnter, target ', target, ' draggedElement ', draggedElement);

		const drop = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			orderId: target.getAttribute('data_order_id') * 1,
		};
		const drag = {
			type: draggedElement.getAttribute('data_type'),
			goalId: draggedElement.getAttribute('data_goal_id') * 1,
			projectId: draggedElement.getAttribute('data_project_id') * 1,
			orderId: draggedElement.getAttribute('data_order_id') * 1,
		};
		console.log('ProjectDrop::onDragEnter, drag ', drag, ' drop ', drop);

		const diff = Math.abs(drag.orderId - drop.orderId);
		console.log(' diff ', diff);

		if (drop.type === drag.type && (diff > 1 || drop.goalId !== drag.goalId)) {
			target.className = 'project-drop--dropping';
		}
	}

	/* eslint-disable class-methods-use-this */
	onDragOver(event) {
		event.preventDefault();
	}

	onDragLeave(event) {
		const { target } = event;
		// console.log('ProjectDrop::onDragLeave, target ', target);
		target.className = 'project-drop--droppable';
	}

	onDrop(event) {
		event.preventDefault();
		const { target } = event;
		const draggedElement = this.getDraggedElement();
		console.log('ProjectDrop::onDragEnter, target ', target, ' draggedElement ', draggedElement);

		const drop = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			orderId: target.getAttribute('data_order_id') * 1,
		};
		const drag = {
			type: draggedElement.getAttribute('data_type'),
			goalId: draggedElement.getAttribute('data_goal_id') * 1,
			projectId: draggedElement.getAttribute('data_project_id') * 1,
			orderId: draggedElement.getAttribute('data_order_id') * 1,
		};
		console.log('ProjectDrop::onDragEnter, drag ', drag, ' drop ', drop);

		target.className = 'project-drop--droppable';
		this.props.actions.moveUserProject(drag, drop);
	}

	render() {
		// console.log('ProjectDrop::render(), props ', this.props);
		const { goalId, project, idx } = this.props;
		const count = (idx * 2) + 1;
		return (
			<div
				className="project-drop--droppable"
				data_type="project"
				data_goal_id={goalId}
				data_project_id={project.id}
				data_order_id={count}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			/>
		);
	}
}

ProjectDrop.propTypes = {
	goalId: PropTypes.number.isRequired,
	project: projectType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,

	actions: PropTypes.shape({
		moveUserProject: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(ProjectDrop);
