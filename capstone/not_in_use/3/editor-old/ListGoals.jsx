
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { goalsType } from '../../types';
import ListGoal from './ListGoal';

class ListGoals extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ListGoals::constructor ', props);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
	}

	render() {
		// console.log('ListGoals::render() props ', this.props);
		const { goals } = this.props;
		const div = goals.map((item, idx) => {
			// console.log('item ', item);
			return (
				<ListGoal
					key={`goal_key_${item.id}`}
					goal={item}
					idx={idx}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			);
		});
		return (
			<div className="list-goals--container">
				{div}
			</div>
		);
	}
}

ListGoals.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(ListGoals);
