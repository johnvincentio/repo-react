import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import { Card, CardContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as actions from '../../redux/actions/';

import { projectType } from '../../types';

// import AddTask from './AddTask';

import { ProjectDialog, FadeProjectMenu } from './';
import { ListTasks, TaskDialog } from '../tasks';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
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
		padding: '1.2em 0 0.2em 0'
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

class ProjectCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editProject: false,
			listTasks: false,
			addTask: false,

			dragging: false,
			dragEnter: false
		};
		// console.log('--- ProjectCard::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onDragStart(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			index: target.getAttribute('data_index') * 1
		};
		// prettier-ignore
		console.log('>>> Project::onDragStart(); goalId ', this.props.goalId,
			' project.id ', this.props.project.id, ' state ', this.state,
			' targetObj ', targetObj, ' draggedElement ', this.getDraggedElement());

		if (
			targetObj.type === 'project' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.project.id
		) {
			const obj = {
				type: 'project',
				goalId: this.props.goalId,
				projectId: this.props.project.id,
				index: targetObj.index
			};
			dataTransfer.setData('text/plain', JSON.stringify(obj));
			dataTransfer.effectAllowed = 'move';
			dataTransfer.dropEffect = 'move';

			this.setDraggedElement(obj);
			this.setState({ dragging: true });
			console.log('*** Project; Dragged element *** ', obj);
		}
		console.log('<<< ProjectCard::onDragStart(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
		console.log('');
	}

	onDragEnd(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			index: target.getAttribute('data_index') * 1
		};
		// prettier-ignore
		console.log('>>> ProjectCard::onDragEnd(); goalId ', this.props.goalId,
			' project.id ', this.props.project.id, ' state ', this.state,
			' targetObj ', targetObj, ' draggedElement ', this.getDraggedElement());

		dataTransfer.clearData();

		this.setDraggedElement('');
		this.setState({ dragging: false, dragEnter: false });
		console.log('<<< ProjectCard::onDragEnd(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
		console.log('');
	}

	onDragEnter(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		const bounding = target.getBoundingClientRect();
		const offset = bounding.y + bounding.height / 2;
		const insertBefore = event.clientY < offset;

		// prettier-ignore
		console.log('>>> ProjectCard::onDragEnter(); goalId ', this.props.goalId,
			' project.id ', this.props.project.id, ' state ', this.state,
			' targetObj ', targetObj, ' draggedElement ', this.getDraggedElement(),
			' bounding ', bounding, ' offset ', offset, ' event.clientY ', event.clientY,
			' insertBefore ', insertBefore);

		let dragEnter = false;
		const dragged = this.getDraggedElement();
		if (
			targetObj.type === 'project' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.project.id &&
			!this.state.dragging &&
			!this.state.dragEnter
		) {
			if (
				dragged.type === 'project' &&
				(targetObj.goalId !== dragged.goalId || targetObj.projectId !== dragged.projectId)
			) {
				dragEnter = true;
				if (insertBefore && dragged.index + 1 === targetObj.index) {
					dragEnter = false;
				}
				if (!insertBefore && dragged.index - 1 === targetObj.index) {
					dragEnter = false;
				}
			}
			if (
				dragged.type === 'task' &&
				(targetObj.goalId !== dragged.goalId || targetObj.projectId !== dragged.projectId)
			) {
				dragEnter = true;
			}
		}

		if (dragEnter) {
			// prettier-ignore
			console.log('*** Project; Drag Enter; goalId ', this.props.goalId,
				' project.id ', this.props.project.id, ' dragEnter ', dragEnter);
			this.setState({ dragEnter: true });
			dataTransfer.dropEffect = 'move';
		}

		console.log('<<< ProjectCard::onDragEnter(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
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
			projectId: target.getAttribute('data_project_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		// prettier-ignore
		console.log('>>> ProjectCard::onDragLeave(); goalId ', this.props.goalId,
			' project.id ', this.props.project.id, ' state ', this.state,
			' targetObj ', targetObj, ' draggedElement ', this.getDraggedElement());

		let dragLeave = false;
		const dragged = this.getDraggedElement();
		if (
			targetObj.type === 'project' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.project.id &&
			!this.state.dragging &&
			this.state.dragEnter
		) {
			if (
				dragged.type === 'project' &&
				(targetObj.goalId !== dragged.goalId || targetObj.projectId !== dragged.projectId)
			) {
				dragLeave = true;
			}
			if (
				dragged.type === 'task' &&
				(targetObj.goalId !== dragged.goalId || targetObj.projectId !== dragged.projectId)
			) {
				dragLeave = true;
			}
		}

		if (dragLeave) {
			// prettier-ignore
			console.log('*** Project; Drag Leave; goalId ', this.props.goalId,
				' project.id ', this.props.project.id, ' dragLeave ', dragLeave);
			this.setState({ dragEnter: false });
		}
		console.log('<<< ProjectCard::onDragLeave(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
		console.log('');
	}

	onDrop(event) {
		event.preventDefault();
		event.stopPropagation();

		const { target } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			index: target.getAttribute('data_index') * 1
		};

		const bounding = target.getBoundingClientRect();
		const offset = bounding.y + bounding.height / 2;
		const insertBefore = event.clientY < offset;

		// prettier-ignore
		console.log('>>> ProjectCard::onDrop(); goalId ', this.props.goalId,
			' project.id ', this.props.project.id, ' state ', this.state,
			' targetObj ', targetObj, ' draggedElement ', this.getDraggedElement(),
			' bounding ', bounding, ' offset ', offset,
			' event.clientY ', event.clientY, ' insertBefore ', insertBefore);

		let drop = false;
		const dragged = this.getDraggedElement();
		if (
			targetObj.type === 'project' &&
			targetObj.goalId === this.props.goalId &&
			targetObj.projectId === this.props.project.id &&
			!this.state.dragging &&
			this.state.dragEnter
		) {
			if (
				dragged.type === 'project' &&
				(targetObj.goalId !== dragged.goalId || targetObj.projectId !== dragged.projectId)
			) {
				drop = true;
			}
			if (
				dragged.type === 'task' &&
				(targetObj.goalId !== dragged.goalId || targetObj.projectId !== dragged.projectId)
			) {
				drop = true;
			}
		}

		if (drop) {
			this.setState({ dragging: false, dragEnter: false });

			const from = {
				type: dragged.type,
				goalId: dragged.goalId,
				projectId: dragged.projectId,
				taskId: dragged.taskId
			};
			const to = {
				type: targetObj.type,
				goalId: targetObj.goalId,
				projectId: targetObj.projectId
			};
			console.log('*** Move Project; from ', from, ' to ', to, ' insertBefore ', insertBefore);
			this.props.actions.moveUserObject(from, to, insertBefore);
		}

		console.log('<<< ProjectCard::onDrop(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
		console.log('');

		return false;
	}

	toggleTasks() {
		// console.log('ProjectCard::toggleTasks');
		this.setState({ listTasks: !this.state.listTasks });
	}

	handleCloneProject = () => {
		// console.log('ProjectCard::handleCloneProject');
		const { goalId, project } = this.props;
		this.props.actions.cloneProject(goalId, project.projectid);
	};

	handleDeleteProject = () => {
		// console.log('ProjectCard::handleDeleteProject');
		const { goalId, project } = this.props;
		this.props.actions.deleteProject(goalId, project.projectid);
	};

	handleEditProject = () => {
		// console.log('ProjectCard::handleEditProject');
		this.setState({ editProject: true });
	};

	closeEditProjectDialog = () => {
		// console.log('ProjectCard::closeEditProjectDialog');
		this.setState({
			editProject: false
		});
	};

	handleAddTask = () => {
		// console.log('ProjectCard::handleAddTask');
		this.setState({ addTask: true });
	};

	closeAddTaskDialog = () => {
		// console.log('ProjectCard::closeAddTaskDialog');
		this.setState({
			addTask: false
		});
	};

	render() {
		// console.log('ProjectCard::render(), props ', this.props);
		const { classes, goalId, project, idx } = this.props;

		const draggingClass = this.state.dragging ? 'project--project-dragging' : '';
		const dragEnterClass = this.state.dragEnter ? 'project--project-dragenter' : '';

		return (
			<div className={classes.container}>
				<Card
					className={classes.card}
					raised
					// className={`project--project ${dragEnterClass} ${draggingClass} ${selectedClass}`}
					data_type="project"
					data_goal_id={goalId}
					data_project_id={project.projectid}
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
								className={classnames(classes.expand, classes.smallIcon, {
									[classes.expandOpen]: this.state.expanded
								})}
								onClick={() => this.toggleTasks()}
								aria-expanded={this.state.expanded}
								aria-label="Show more"
							>
								{this.state.listTasks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</IconButton>

							<Typography noWrap variant="title" className={classes.title}>
								{project.title}
							</Typography>

							<FadeProjectMenu
								projectid={project.projectid}
								edit={this.handleEditProject}
								clone={this.handleCloneProject}
								delete={this.handleDeleteProject}
								add={this.handleAddTask}
							/>
						</div>
					</CardContent>

					{this.state.addTask && (
						<TaskDialog goalId={goalId} projectId={project.projectid} close={this.closeAddTaskDialog} />
					)}
					{this.state.editProject && (
						<ProjectDialog goalId={goalId} project={project} close={this.closeEditProjectDialog} />
					)}
				</Card>
				{this.state.listTasks && (
					<ListTasks
						goalId={goalId}
						projectId={project.projectid}
						tasks={project.tasks}
						getDraggedElement={this.getDraggedElement}
						setDraggedElement={this.setDraggedElement}
					/>
				)}
			</div>
		);
	}
}

ProjectCard.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goalId: PropTypes.number.isRequired,
	project: projectType.isRequired, // eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	actions: PropTypes.shape({
		moveUserObject: PropTypes.func.isRequired,
		cloneProject: PropTypes.func.isRequired,
		deleteProject: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(ProjectCard);
