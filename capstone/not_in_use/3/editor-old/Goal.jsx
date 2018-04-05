import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { goalType, selectType, commandType } from '../../types';

import { EditGoal } from '../editor';

import AddProject from './AddProject';
import ListProjects from './ListProjects';

class Goal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listProjects: false,
			dragging: false,
			dragEnter: false
		};
		// console.log('--- Goal::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);

		this.onClickToggle = this.onClickToggle.bind(this);
		this.onClickSelectGoal = this.onClickSelectGoal.bind(this);

		// this.onDrag = this.onDrag.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onClickToggle() {
		// console.log('Goal::onClickToggle');
		this.setState({ listProjects: !this.state.listProjects });
	}

	onClickSelectGoal(goal) {
		// console.log('Goal::onClickSelectGoal ', goal);
		this.props.actions.selectedGoal(goal.id);
	}

	/* eslint-disable class-methods-use-this */
	onDragStart(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			index: target.getAttribute('data_index') * 1
		};
		console.log(
			'>>> Goal::onDragStart(); goal.id ',
			this.props.goal.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement()
		);

		if (targetObj.type === 'goal' && targetObj.goalId === this.props.goal.id) {
			const obj = { type: 'goal', goalId: this.props.goal.id, index: targetObj.index };
			dataTransfer.setData('text/plain', JSON.stringify(obj));
			dataTransfer.effectAllowed = 'move';
			dataTransfer.dropEffect = 'move';

			this.setDraggedElement(obj);
			this.setState({ dragging: true });
			console.log('*** Goal; Dragged element *** ', obj);
		}
		console.log('<<< Goal::onDragStart(); goal.id ', this.props.goal.id);
		console.log('');
	}

	onDragEnd(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			index: target.getAttribute('data_index') * 1
		};
		console.log(
			'>>> Goal::onDragEnd(); goal.id ',
			this.props.goal.id,
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
		console.log('<<< Goal::onDragEnd(); goal.id ', this.props.goal.id);
		console.log('');
	}

	onDragEnter(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		const bounding = target.getBoundingClientRect();
		const offset = bounding.y + bounding.height / 2;
		const insertBefore = event.clientY < offset;

		console.log(
			'>>> Goal::onDragEnter(); goal.id ',
			this.props.goal.id,
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
			targetObj.type === 'goal' &&
			targetObj.goalId === this.props.goal.id &&
			!this.state.dragging &&
			!this.state.dragEnter
		) {
			if (dragged.type === 'goal' && targetObj.goalId !== dragged.goalId) {
				dragEnter = true;
				if (insertBefore && dragged.index + 1 === targetObj.index) {
					dragEnter = false;
				}
				if (!insertBefore && dragged.index - 1 === targetObj.index) {
					dragEnter = false;
				}
			}
			if (dragged.type === 'project' && targetObj.goalId !== dragged.goalId) {
				dragEnter = true;
			}
		}

		if (dragEnter) {
			console.log('*** Goal; Drag Enter; goal.id ', this.props.goal.id, 'dragEnter ', dragEnter);
			this.setState({ dragEnter: true });
			dataTransfer.dropEffect = 'move';
		}
		console.log('<<< Goal::onDragEnter(); goal.id ', this.props.goal.id);
		console.log('');
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
			index: target.getAttribute('data_index') * 1
		};
		console.log(
			'>>> Goal::onDragLeave(); goal.id ',
			this.props.goal.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement()
		);

		let dragLeave = false;
		if (
			targetObj.type === 'goal' &&
			targetObj.goalId === this.props.goal.id &&
			!this.state.dragging &&
			this.state.dragEnter
		) {
			const dragged = this.getDraggedElement();
			if (dragged.type === 'goal' && targetObj.goalId !== dragged.goalId) {
				dragLeave = true;
			}
			if (dragged.type === 'project' && targetObj.goalId !== dragged.goalId) {
				dragLeave = true;
			}
		}
		if (dragLeave) {
			console.log('*** Goal; Drag Leave; goal.id ', this.props.goal.id, 'dragLeave ', dragLeave);
			this.setState({ dragEnter: false });
		}
		console.log('<<< Goal::onDragLeave(); goal.id ', this.props.goal.id);
		console.log('');
	}

	onDrop(event) {
		event.preventDefault();
		event.stopPropagation();
		const { target } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		const bounding = target.getBoundingClientRect();
		const offset = bounding.y + bounding.height / 2;
		const insertBefore = event.clientY < offset;

		console.log(
			'>>> Goal::onDrop(); goal.id ',
			this.props.goal.id,
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
			targetObj.type === 'goal' &&
			targetObj.goalId === this.props.goal.id &&
			!this.state.dragging &&
			this.state.dragEnter
		) {
			if (dragged.type === 'goal' && targetObj.goalId !== dragged.goalId) {
				drop = true;
			}
			if (dragged.type === 'project' && targetObj.goalId !== dragged.goalId) {
				drop = true;
			}
		}

		if (drop) {
			this.setState({ dragging: false, dragEnter: false });

			const from = {
				type: dragged.type,
				goalId: dragged.goalId,
				projectId: dragged.projectId
			};
			const to = {
				type: targetObj.type,
				goalId: targetObj.goalId
			};

			console.log('*** Move Goal; from ', from, ' to ', to, ' insertBefore ', insertBefore);
			this.props.actions.moveUserObject(from, to, insertBefore);
		}

		console.log('<<< Goal::onDrop(); goal.id ', this.props.goal.id);
		console.log('');

		return false;
	}

	render() {
		console.log('>>> Goal::render(), goal.id ', this.props.goal.id);
		const { goal, idx } = this.props;

		const { selectedType, selectedGoalId } = this.props.selected;
		const selectedGoal = selectedType === 'goal' && selectedGoalId === goal.id;
		// console.log('selectedType ', selectedType, ' selectedGoalId ', selectedGoalId, ' selectedGoal ', selectedGoal);

		const { commandedType } = this.props.command;
		const editGoal = selectedGoal && commandedType === 'edit';
		const addProject = selectedGoal && commandedType === 'add';
		// console.log('commandedType ', commandedType, ' editGoal ', editGoal, ' addProject ', addProject);

		const toggleClass = this.state.listProjects ? 'fa fa-angle-down' : 'fa fa-angle-right';
		const selectedClass = selectedGoal ? 'goal--selected' : '';

		const draggingClass = this.state.dragging ? 'goal--goal-dragging' : '';

		const dragEnterClass = this.state.dragEnter ? 'goal--goal-dragenter' : '';

		// console.log('<<< Goal::render(), goal.id ', this.props.goal.id);
		// console.log('');

		return (
			<div className="goal--container">
				{/* <div className={`${dragEnterClass}`}	aria-hidden="true" role="presentation" /> */}
				<div>
					<button className="goal--goal-icon" onClick={() => this.onClickToggle()}>
						<i className={`${toggleClass}`} />
					</button>
					<button
						className={`goal--goal ${dragEnterClass} ${draggingClass} ${selectedClass}`}
						data_type="goal"
						data_goal_id={goal.id}
						data_index={idx}
						draggable="true"
						// onDrag={this.onDrag}
						onDragStart={this.onDragStart}
						onDragEnd={this.onDragEnd}
						onDragEnter={this.onDragEnter}
						onDragOver={this.onDragOver}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
						onClick={() => this.onClickSelectGoal(goal)}
					>
						<div data_type="none" className="goal--goal-text">
							{goal.title}
						</div>
					</button>
				</div>

				{/* <div className={`${dragEnterClass}`} aria-hidden="true" role="presentation" /> */}

				{(this.state.listProjects || addProject || editGoal) && (
					<div>
						{editGoal && (
							<div>
								<EditGoal goal={goal} />
							</div>
						)}
						{addProject && <AddProject goalId={goal.id} />}
						{this.state.listProjects && (
							<ListProjects
								goalId={goal.id}
								projects={goal.projects}
								getDraggedElement={this.getDraggedElement}
								setDraggedElement={this.setDraggedElement}
							/>
						)}
					</div>
				)}
			</div>
		);
	}
}

Goal.propTypes = {
	goal: goalType.isRequired, // eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	selected: selectType.isRequired, // eslint-disable-line react/no-typos
	command: commandType.isRequired, // eslint-disable-line react/no-typos

	actions: PropTypes.shape({
		selectedGoal: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal);

// const drop = {
// 	goalId: target.getAttribute('data_goal_id') * 1,
// 	orderId: target.getAttribute('data_order_id') * 1,
// 	type: target.getAttribute('data_type'),
// };
// target.className = 'goal--goal goal--goal-drop-before ';
// goal--goal-text
// const drag = {
// 	goalId: draggedElement.getAttribute('data_goal_id') * 1,
// 	orderId: draggedElement.getAttribute('data_order_id') * 1,
// 	type: draggedElement.getAttribute('data_type'),
// };
// console.log('Goal::onDragEnter, drag ', drag, ' drop ', drop);

// const diff = Math.abs(drag.orderId - drop.orderId);
// console.log(' diff ', diff);

// if (drop.type === drag.type && diff > 1) {
// 	target.className = 'goal-drop--dropping';
// }

/*
<style>
.column.over {
  border: 2px dashed #000;
}
</style>
*/

// target.classList.add('goal--goal-dragging');
// target.className = 'goal--goal goal--goal-dragging';
// target.classList.add('goal--goal-dragging');

/*
			const divBefore = target.closest('.goal--goal-before');
			console.log('divBefore ', divBefore);
			const jv = target.closest('.goal--goal-text');
			console.log('jv ', jv);
			const jv1 = target.querySelector('.goal--goal-text');
			console.log('jv1 ', jv1);
			const jv2 = target.querySelector('.goal--goal-before');
			console.log('jv2 ', jv2);

			const jv3 = jv1.closest('.goal--goal-before');
			console.log('jv3 ', jv3);

			const jv5 = getClosest(jv1, '.goal--goal-before');
			console.log('jv5 ', jv5);

			const jv6 = getClosest(target, '.editor');
			console.log('jv6 ', jv6);

			const jv7 = getClosest(target, '.goal--container');
			console.log('jv7 ', jv7);

			const jv8 = getClosest(target, '.jv');
			console.log('jv8 ', jv8);

			const jv9 = getClosest(jv7, '.jv');
			const jv9a = jv7.closest('.jv');
			console.log('jv9 ', jv9);
			console.log('jv9a ', jv9a);

			const jv11 = jv7.querySelector('.jv');
			console.log('jv11 ', jv11);
	*/

/*
const getClosest = function ( elem, selector ) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Get closest match
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}

	return null;

};
*/

// function showUseful(msg, event) {
// 	console.log(`>>> showUseful - ${msg}, event ${event}`);
// 	const bounding = event.target.getBoundingClientRect();
// 	const offset = bounding.y + (bounding.height / 2);
// 	console.log('event.clientY ', event.clientY);
// 	console.log('event.clientX ', event.clientX);
// 	console.log('bounding ', bounding);
// 	console.log(`<<< showUseful - ${msg}`);
// }

// function showGoal(msg, props, state, target, dragged) {
// 	console.log(`${msg}; goal.id ${props.goal.id}, state ${state}, target ${target}, dragged ${dragged}`);
// }

// onDrop(event) {
// 	event.preventDefault();
// 	showUseful('GoalDrop::onDrop', event);
// 	const { target } = event;
// 	const draggedElement = this.getDraggedElement();
// 	console.log('GoalDrop::onDrop, target ', target, ' draggedElement ', draggedElement);
// 	const drop = {
// 		goalId: target.getAttribute('data_goal_id') * 1,
// 		orderId: target.getAttribute('data_order_id') * 1,
// 		type: target.getAttribute('data_type'),
// 	};
// 	const drag = {
// 		goalId: draggedElement.getAttribute('data_goal_id') * 1,
// 		orderId: draggedElement.getAttribute('data_order_id') * 1,
// 		type: draggedElement.getAttribute('data_type'),
// 	};
// 	console.log('GoalDrop::onDrop, drag ', drag, ' drop ', drop);

// 	target.className = 'goal-drop--droppable';
// 	// this.props.actions.moveUserGoal(drag.goalId, drop.goalId);
// }
