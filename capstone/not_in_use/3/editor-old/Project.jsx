import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { projectType, selectType, commandType } from '../../types';

import EditProject from './EditProject';
import AddTask from './AddTask';
import ListTasks from './ListTasks';

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listTasks: false,
			dragging: false,
			dragEnter: false
		};
		// console.log('--- Project::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);

		this.onClickToggle = this.onClickToggle.bind(this);
		this.onClickSelectProject = this.onClickSelectProject.bind(this);

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onClickToggle() {
		// console.log('Project::onClickToggle');
		this.setState({ listTasks: !this.state.listTasks });
	}

	onClickSelectProject(goalId, project) {
		// console.log('Project::onClickSelectProject, goalId ', goalId, ' project ', project);
		this.props.actions.selectedProject(goalId, project.id);
	}

	onDragStart(event) {
		const { target, dataTransfer } = event;
		const targetObj = {
			type: target.getAttribute('data_type'),
			goalId: target.getAttribute('data_goal_id') * 1,
			projectId: target.getAttribute('data_project_id') * 1,
			index: target.getAttribute('data_index') * 1
		};
		console.log(
			'>>> Project::onDragStart(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.project.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement()
		);

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
		console.log('<<< Project::onDragStart(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
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
		console.log(
			'>>> Project::onDragEnd(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.project.id,
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
		console.log('<<< Project::onDragEnd(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
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

		console.log(
			'>>> Project::onDragEnter(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.project.id,
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
			console.log(
				'*** Project; Drag Enter; goalId ',
				this.props.goalId,
				' project.id ',
				this.props.project.id,
				' dragEnter ',
				dragEnter
			);
			this.setState({ dragEnter: true });
			dataTransfer.dropEffect = 'move';
		}

		console.log('<<< Project::onDragEnter(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
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

		console.log(
			'>>> Project::onDragLeave(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.project.id,
			' state ',
			this.state,
			' targetObj ',
			targetObj,
			' draggedElement ',
			this.getDraggedElement()
		);

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
			console.log(
				'*** Project; Drag Leave; goalId ',
				this.props.goalId,
				' project.id ',
				this.props.project.id,
				' dragLeave ',
				dragLeave
			);
			this.setState({ dragEnter: false });
		}
		console.log('<<< Project::onDragLeave(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
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

		console.log(
			'>>> Project::onDrop(); goalId ',
			this.props.goalId,
			' project.id ',
			this.props.project.id,
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

		console.log('<<< Project::onDrop(); goalId ', this.props.goalId, ' project.id ', this.props.project.id);
		console.log('');

		return false;
	}

	render() {
		// console.log('Project::render(), props ', this.props);
		const { goalId, project, idx } = this.props;

		const { selectedType, selectedGoalId, selectedProjectId } = this.props.selected;
		const selectedProject = selectedType === 'project' && selectedGoalId === goalId && selectedProjectId === project.id;
		// console.log(
		// 	'selectedType ', selectedType, ' selectedGoalId ', selectedGoalId, ' selectedProjectId ', selectedProjectId,
		// 	' selectedProject ', selectedProject,
		// );

		const { commandedType } = this.props.command;

		const editProject = selectedProject && commandedType === 'edit';
		const addTask = selectedProject && commandedType === 'add';
		// console.log('commandedType ', commandedType, ' editProject ', editProject, ' addTask ', addTask);

		const toggleClass = this.state.listTasks ? 'fa fa-angle-down' : 'fa fa-angle-right';

		const selectedClass = selectedProject ? 'project--selected' : '';

		const draggingClass = this.state.dragging ? 'project--project-dragging' : '';

		const dragEnterClass = this.state.dragEnter ? 'project--project-dragenter' : '';

		return (
			<div className="project--container">
				<div>
					<button className="project--project-icon" onClick={() => this.onClickToggle()}>
						<i className={`${toggleClass}`} />
					</button>
					<button
						className={`project--project ${dragEnterClass} ${draggingClass} ${selectedClass}`}
						data_type="project"
						data_goal_id={goalId}
						data_project_id={project.id}
						data_index={idx}
						draggable="true"
						onDragStart={this.onDragStart}
						onDragEnd={this.onDragEnd}
						onDragEnter={this.onDragEnter}
						onDragOver={this.onDragOver}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
						onClick={() => this.onClickSelectProject(goalId, project)}
					>
						<div className="project--project-text">{project.title}</div>
					</button>
				</div>

				{(this.state.listTasks || addTask || editProject) && (
					<div>
						{editProject && (
							<div>
								<EditProject goalId={goalId} project={project} />
							</div>
						)}
						{addTask && <AddTask goalId={goalId} projectId={project.id} />}
						{this.state.listTasks && (
							<ListTasks
								goalId={goalId}
								projectId={project.id}
								tasks={project.tasks}
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

Project.propTypes = {
	goalId: PropTypes.number.isRequired,
	project: projectType.isRequired, // eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	selected: selectType.isRequired, // eslint-disable-line react/no-typos
	command: commandType.isRequired, // eslint-disable-line react/no-typos

	actions: PropTypes.shape({
		updateUserProject: PropTypes.func.isRequired,
		selectedProject: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Project);
