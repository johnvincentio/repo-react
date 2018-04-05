import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { goalType } from '../../types';

import TextInput from '../../toolbox/TextInput';
import TextArea from '../../toolbox/TextArea';
import Dropdown from '../../toolbox/Dropdown';

import * as statusUtilities from '../../utilities/statusUtilities';

class EditGoal extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- EditGoal ', props);
		this.updateGoalTitle = this.updateGoalTitle.bind(this);
		this.updateGoalStatus = this.updateGoalStatus.bind(this);
		this.updateGoalDescription = this.updateGoalDescription.bind(this);

		this.onClickCancel = this.onClickCancel.bind(this);
	}

	onClickCancel() {
		this.props.actions.commandInitialize();
	}

	updateGoalTitle(value) {
		// console.log('--- updateGoalTitle, value:', value);
		// console.log('--- updateGoalTitle, this.props ', this.props);
		const { goal } = this.props;
		this.props.actions.updateUserGoal(goal.id, { field: 'title', value });
	}

	updateGoalStatus(value) {
		// console.log('--- updateGoalStatus, value:', value);
		const { goal } = this.props;
		this.props.actions.updateUserGoal(goal.id, { field: 'status', value: value * 1 });
	}

	updateGoalDescription(value) {
		// console.log('--- updateGoalDescription, value:', value);
		// console.log('--- updateGoalDescription, this.props ', this.props);
		const { goal } = this.props;
		this.props.actions.updateUserGoal(goal.id, { field: 'description', value });
	}

	render() {
		// console.log('EditGoal::render() props ', this.props);
		const { goal } = this.props;
		return (
			<div>
				<button className="goal--goal-cancel" onClick={() => this.onClickCancel()}>
					<i className="fa fa-times-circle" />
				</button>

				<TextInput
					id="goal-0-title"
					name="name"
					inputType="text"
					maxLength="10"
					content={goal.title}
					placeholder="Enter goal title"
					submit={this.updateGoalTitle}
					required
				/>

				<TextArea
					id="goal-0-description"
					rows={5}
					resize={false}
					content={goal.description}
					name="description"
					submit={this.updateGoalDescription}
					placeholder="Description"
				/>

				<Dropdown
					name="Status"
					options={statusUtilities.getStatusOptions()}
					selectedOption={goal.status}
					submit={this.updateGoalStatus}
				/>
			</div>
		);
	}
}

EditGoal.propTypes = {
	goal: goalType.isRequired, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		updateUserGoal: PropTypes.func.isRequired,
		commandInitialize: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(EditGoal);
