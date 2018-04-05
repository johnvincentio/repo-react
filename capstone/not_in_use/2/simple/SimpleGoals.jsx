import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';

import { goalsType } from '../../types';
import SimpleGoal from './SimpleGoal';

const SimpleGoals = props => {
	const { goals } = props;
	// console.log('--- SimpleGoals, goals ', goals);
	const div = goals.map(goal => (
		<div key={`goal-${goal.id}`}>
			<SimpleGoal goal={goal} />
		</div>
	));
	return <div>{div}</div>;
};

SimpleGoals.propTypes = {
	goals: goalsType.isRequired
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleGoals);
