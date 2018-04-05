
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { goalType } from '../../types';

function showUseful(msg, event) {
	console.log(`>>> showUseful - ${msg}, event ${event}`);
	const bounding = event.target.getBoundingClientRect();
	const offset = bounding.y + (bounding.height / 2);
	console.log('event.clientY ', event.clientY);
	console.log('event.clientX ', event.clientX);
	console.log('bounding ', bounding);
	console.log(`<<< showUseful - ${msg}`);
}

class GoalDrop extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- GoalDrop::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onDragEnter(event) {
		const { target } = event;
		const draggedElement = this.getDraggedElement();
		console.log('GoalDrop::onDragEnter, target ', target, ' draggedElement ', draggedElement);
		showUseful('GoalDrop::onDragEnter', event);
		const drop = {
			goalId: target.getAttribute('data_goal_id') * 1,
			orderId: target.getAttribute('data_order_id') * 1,
			type: target.getAttribute('data_type'),
		};
		const drag = {
			goalId: draggedElement.getAttribute('data_goal_id') * 1,
			orderId: draggedElement.getAttribute('data_order_id') * 1,
			type: draggedElement.getAttribute('data_type'),
		};
		console.log('GoalDrop::onDragEnter, drag ', drag, ' drop ', drop);

		const diff = Math.abs(drag.orderId - drop.orderId);
		console.log(' diff ', diff);

		if (drop.type === drag.type && diff > 1) {
			target.className = 'goal-drop--dropping';
		}
	}

	/* eslint-disable class-methods-use-this */
	onDragOver(event) {
		event.preventDefault();
		// showUseful('GoalDrop::onDragOver', event);
	}

	onDragLeave(event) {
		const { target } = event;
		console.log('GoalDrop::onDragLeave, target ', target);
		showUseful('GoalDrop::onDragLeave', event);
		target.className = 'goal-drop--droppable';
	}

	onDrop(event) {
		event.preventDefault();
		showUseful('GoalDrop::onDrop', event);
		const { target } = event;
		const draggedElement = this.getDraggedElement();
		console.log('GoalDrop::onDrop, target ', target, ' draggedElement ', draggedElement);
		const drop = {
			goalId: target.getAttribute('data_goal_id') * 1,
			orderId: target.getAttribute('data_order_id') * 1,
			type: target.getAttribute('data_type'),
		};
		const drag = {
			goalId: draggedElement.getAttribute('data_goal_id') * 1,
			orderId: draggedElement.getAttribute('data_order_id') * 1,
			type: draggedElement.getAttribute('data_type'),
		};
		console.log('GoalDrop::onDrop, drag ', drag, ' drop ', drop);

		target.className = 'goal-drop--droppable';
		this.props.actions.moveUserGoal(drag.goalId, drop.goalId);
	}

	render() {
		// console.log('GoalDrop::render(), props ', this.props);
		const { goal, idx } = this.props;
		const count = (idx * 2) + 1;
		return (
			<div
				className="goal-drop--droppable"
				data_type="goal"
				data_goal_id={goal.id}
				data_order_id={count}
				data_index={idx}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			/>
		);
	}
}

GoalDrop.propTypes = {
	goal: goalType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,

	actions: PropTypes.shape({
		moveUserGoal: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(GoalDrop);
