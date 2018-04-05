
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { goalType, selectType, commandType } from '../../types';

import EditGoal from './EditGoal';
import AddProject from './AddProject';
import ListProjects from './ListProjects';

class Goal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { listProjects: false };
		// console.log('--- Goal::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);

		this.onClickToggle = this.onClickToggle.bind(this);
		this.onClickSelectGoal = this.onClickSelectGoal.bind(this);

		// this.onDrag = this.onDrag.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onClickToggle() {
		// console.log('Goal::onClickToggle');
		this.setState({ listProjects: !this.state.listProjects });
	}

	onClickSelectGoal(goal) {
		// console.log('Goal::onClickSelectGoal ', goal);
		this.props.actions.selectedGoal(goal.id);
	}

	onDragStart(event) {
		const { target, dataTransfer } = event;
		console.log('Goal::onDragStart(), target ', target);
		target.className = 'goal--goal-dragging';
		this.setDraggedElement(target);
		dataTransfer.setData('text', target);
		dataTransfer.effectAllowed = 'move';
	}

	onDragEnd(event) {
		const { target, dataTransfer } = event;
		console.log('Goal::onDragEnd(), target ', target);
		target.className = 'goal--goal';
		this.setDraggedElement('');
		dataTransfer.clearData();
	}

	render() {
		// console.log('Goal::render(), props ', this.props);
		const { goal, idx } = this.props;
		const count = (idx + 1) * 2;

		const { selectedType, selectedGoalId } = this.props.selected;
		const selectedGoal = selectedType === 'goal' && selectedGoalId === goal.id;
		// console.log('selectedType ', selectedType, ' selectedGoalId ', selectedGoalId, ' selectedGoal ', selectedGoal);

		const { commandedType } = this.props.command;
		const editGoal = (selectedGoal && commandedType === 'edit');
		const addProject = (selectedGoal && commandedType === 'add');
		// console.log('commandedType ', commandedType, ' editGoal ', editGoal, ' addProject ', addProject);

		const toggleClass = this.state.listProjects ? 'fa fa-angle-down' : 'fa fa-angle-right';
		const selectedClass = selectedGoal ? 'goal--selected' : '';
		return (
			<div className="goal--container">
				<button
					className="goal--goal-icon"
					onClick={() => this.onClickToggle()}
				>
					<i className={`${toggleClass}`}	/>
				</button>
				<button
					className={`goal--goal ${selectedClass}`}
					data_type="goal"
					data_goal_id={goal.id}
					data_order_id={count}
					data_index={idx}
					draggable="true"
					// onDrag={this.onDrag}
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
					onClick={() => this.onClickSelectGoal(goal)}
				>
					<div className="goal--goal-text">{goal.description}</div>
					{/* <div className="goal--goal-text">{goal.comments}</div> */}
					{/* <div className="goal--goal-text">{statusUtilities.getStatusOption(goal.status)}</div> */}
				</button>
				{(this.state.listProjects || addProject || editGoal) &&
					<div>
						{editGoal &&
							<div>
								<EditGoal goal={goal} />
							</div>
						}
						{addProject &&
							<AddProject goalId={goal.id} />
						}
						{this.state.listProjects &&
							<ListProjects
								goalId={goal.id}
								projects={goal.projects}
								getDraggedElement={this.getDraggedElement}
								setDraggedElement={this.setDraggedElement}
							/>
						}
					</div>
				}
			</div>
		);
	}
}

Goal.propTypes = {
	goal: goalType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	selected: selectType.isRequired,		// eslint-disable-line react/no-typos
	command: commandType.isRequired,		// eslint-disable-line react/no-typos

	actions: PropTypes.shape({
		selectedGoal: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	selected: state.selectedReducer.selected,
	command: state.commandReducer.command,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
