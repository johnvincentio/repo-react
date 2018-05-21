//

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import * as actions from '../../redux/actions/';

import { tasksListType } from '../../types';

import { TaskCard } from './';

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
		// padding: '20px',
		// minHeight: '500px'
		// margin: '10px'
	}
};

class TasksGridViewer extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- TasksGridViewer::constructor, props ', props);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
	}

	render() {
		const { classes, tasksList } = this.props;

		const div = tasksList.map((item, idx) => (
			<Fragment key={`tasks-${item.task.taskid}`}>
				<TaskCard
					goalId={item.goal.goalid}
					projectId={item.project.projectid}
					task={item.task}
					idx={idx}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			</Fragment>
		));

		return <Paper className={classes.container}>{div}</Paper>;
	}
}

TasksGridViewer.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

	tasksList: tasksListType.isRequired, // eslint-disable-line react/no-typos
	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(TasksGridViewer);
