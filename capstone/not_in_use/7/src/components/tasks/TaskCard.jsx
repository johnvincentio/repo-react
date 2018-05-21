import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import { Card, CardContent, IconButton, Typography } from '@material-ui/core';

import Star from '@material-ui/icons/Star';

import * as actions from '../../redux/actions/';
import { taskType } from '../../types';

import { FadeTaskMenu, TaskDialog } from './';

import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as dateUtilities from '../../utilities/datesUtilities';

const styles = theme => ({
	card: {
		width: '300px',
		// maxWidth: 400,
		margin: '15px',
		position: 'relative'
	},
	cardContent: {
		flex: '1 0 auto',
		padding: '10px!important',
		// color: theme.palette.secondary,
		// backgroundColor: theme.palette.third.light,
		'&:hover': {
			backgroundColor: '#99f'
		}
	},
	firstRow: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	starred: {
		fill: theme.palette.star.dark
	},
	smallIcon: {
		width: 24,
		height: 24
	},
	title: {
		// color: 'white!important',
		fontSize: '1.2em',
		textAlign: 'center',
		padding: '1.2em 0'
	},
	thirdRow: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	fourthRow: {
		display: 'flex',
		justifyContent: 'center'
	},

	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	}
});

class TaskCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editTask: false,
			dragging: false,
			dragEnter: false
		};
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
	}

	onClickTaskStar = (goalId, projectId, task) => {
		// console.log('TaskCard::onClickTaskStar goalId ', goalId, ' projectId ', projectId, ' task ', task);
		const obj = JSON.parse(JSON.stringify(task));
		obj.starred = !obj.starred;
		this.props.actions.updateTask(goalId, projectId, task.taskid, obj);
	};

	handleCloneTask = () => {
		// console.log('TaskCard::handleCloneTask');
		const { goalId, projectId, task } = this.props;
		this.props.actions.cloneTask(goalId, projectId, task.taskid);
	};

	handleDeleteTask = () => {
		// console.log('TaskCard::handleDeleteTask');
		const { goalId, projectId, task } = this.props;
		this.props.actions.deleteTask(goalId, projectId, task.taskid);
	};

	handleEditTask = () => {
		// console.log('TaskCard::handleEditTask');
		this.setState({ editTask: true });
	};

	closeEditTaskDialog = () => {
		// console.log('TaskCard::closeEditTaskDialog');
		this.setState({
			editTask: false
		});
	};

	render() {
		// console.log('TaskCard::render; props ', this.props);
		const { classes, goalId, projectId, task, idx } = this.props;

		const start = dateUtilities.transformObjectToUserDateString(task.start);
		const end = dateUtilities.transformObjectToUserDateString(task.end);
		// console.log('start ', start, ' task.start ', task.start);
		// console.log('end ', end, ' task.end ', task.end);

		// const selectedClass = selectedTask ? 'taskviewer--selected' : '';

		const draggingClass = this.state.dragging ? 'taskviewer--task-dragging' : '';
		const dragEnterClass = this.state.dragEnter ? 'taskviewer--task-dragenter' : '';

		let status = taskStatusUtilities.taskStatusOption(task.status);
		if (status === 'None') {
			status = '';
		}

		// if (editTask) {
		// 	return <TaskEditViewer goalId={goalId} projectId={projectId} task={task} />;
		// }
		return (
			<Card
				className={classes.card}
				raised
				// className={`jv-taskviewer--card ${dragEnterClass} ${draggingClass} ${selectedClass}`}
				data_type="task"
				data_goal_id={goalId}
				data_project_id={projectId}
				data_task_id={task.taskid}
				data_index={idx}
				draggable="true"
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			>
				<CardContent classes={{ root: classes.cardContent }}>
					<div className={classes.firstRow}>
						<IconButton
							className={classes.smallIcon}
							aria-label="Star Task"
							onClick={() => this.onClickTaskStar(goalId, projectId, task)}
						>
							<Star
								className={classnames({
									[classes.starred]: task.starred
								})}
							/>
						</IconButton>

						<Typography className={classes.status} variant="subheading" color="textSecondary">
							{status}
						</Typography>

						<FadeTaskMenu edit={this.handleEditTask} clone={this.handleCloneTask} delete={this.handleDeleteTask} />
					</div>

					<Typography noWrap variant="title" className={classes.title}>
						{task.title}
					</Typography>

					<div className={classes.thirdRow}>
						<Typography variant="body1" color="textSecondary">
							{start}
						</Typography>
						<Typography variant="body1" color="textSecondary">
							{end}
						</Typography>
					</div>
				</CardContent>

				{this.state.editTask && (
					<TaskDialog goalId={goalId} projectId={projectId} task={task} close={this.closeEditTaskDialog} />
				)}
			</Card>
		);
	}
}

TaskCard.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType.isRequired,
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	actions: PropTypes.shape({
		updateTask: PropTypes.func.isRequired,
		cloneTask: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(TaskCard);

/*
		return (
			<Card
				className={classes.card}
				raised
				// className={`jv-taskviewer--card ${dragEnterClass} ${draggingClass} ${selectedClass}`}
				data_type="task"
				data_goal_id={goalId}
				data_project_id={projectId}
				data_task_id={task.taskid}
				data_index={idx}
				draggable="true"
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			>
				<CardHeader
					classes={{
						// root: `${classes.cardHeader} ${classes[`${headerColor}CardHeader`]}${cardPlainHeaderClasses}`,
						root: classes.cardHeader,
						title: classes.cardTitle
						// subheader: classes.cardSubtitle
					}}
					// avatar={
					// 	<Avatar aria-label="Recipe" className={classes.avatar}>
					// 		R
					// 	</Avatar>
					// }
					action={
						<Fragment>
							<IconButton onClick={() => this.onClickSelectTask(goalId, projectId, task)}>
								<StarBorder />
							</IconButton>
							<IconButton
								className={classnames(classes.expand, {
									[classes.expandOpen]: this.state.expanded
								})}
								onClick={this.handleExpandClick}
								aria-expanded={this.state.expanded}
								aria-label="Show more"
							>
								<ExpandMoreIcon />
							</IconButton>
							<IconButton onClick={() => this.onClickSelectTask(goalId, projectId, task)}>
								<MoreVertIcon />
							</IconButton>
						</Fragment>
					}
					title={task.title}
					subheader={status}
				/>
				<CardContent className={classes.dates}>
					<Typography variant="body1">{start}</Typography>
					<Typography variant="body1">{end}</Typography>
				</CardContent>

				{/* <CardActions className={classes.actions}>
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.expanded
						})}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.expanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions> 

				{<div className="taskviewer--card-status">{status}</div>
				<div className="taskviewer--card-main">
					<div className="taskviewer--card-title">{task.title}</div>
				</div>
				<div className="taskviewer--card-start-date">{start}</div>
				<div className="taskviewer--card-end-date">{end}</div>}
				</Card>
			);
*/
