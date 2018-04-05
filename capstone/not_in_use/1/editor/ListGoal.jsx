
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { goalType } from '../../types';

import GoalDrop from './GoalDrop';
import Goal from './Goal';

class ListGoal extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ListGoal::constructor ', props);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
	}

	render() {
		// console.log('ListGoal::render() props ', this.props);
		const { goal, idx } = this.props;
		return (
			<div className="listgoal--container" key={`outer_key_${idx}`}>
				<GoalDrop
					goal={goal}
					idx={idx}
					getDraggedElement={this.getDraggedElement}
				/>
				<Goal
					goal={goal}
					idx={idx}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			</div>
		);
	}
}

ListGoal.propTypes = {
	goal: goalType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(ListGoal);
