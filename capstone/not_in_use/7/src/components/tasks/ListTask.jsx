import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/';
import { taskType } from '../../types';

import { TaskCard } from './';

class ListTask extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ListTask::constructor ', props);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
	}

	render() {
		// console.log('ListTask::render() props ', this.props);
		const { goalId, projectId, task, idx } = this.props;
		return (
			<TaskCard
				goalId={goalId}
				projectId={projectId}
				task={task}
				idx={idx}
				getDraggedElement={this.getDraggedElement}
				setDraggedElement={this.setDraggedElement}
			/>
		);
	}
}

ListTask.propTypes = {
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType.isRequired, // eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(ListTask);
