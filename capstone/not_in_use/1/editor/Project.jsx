
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
		this.state = { listTasks: false };
		// console.log('--- Project::constructor ', props);

		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);

		this.onClickToggle = this.onClickToggle.bind(this);
		this.onClickSelectProject = this.onClickSelectProject.bind(this);

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
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
		console.log('Project::onDragStart(), target ', target);
		target.className = 'project--project-dragging ';
		this.setDraggedElement(target);
		dataTransfer.setData('text', target);
		dataTransfer.effectAllowed = 'move';
	}

	onDragEnd(event) {
		const { target, dataTransfer } = event;
		console.log('Project::onDragEnd(), target ', target);
		target.className = 'project--project';
		this.setDraggedElement('');
		dataTransfer.clearData();
	}

	render() {
		// console.log('Project::render(), props ', this.props);
		const { goalId, project, idx } = this.props;
		const count = (idx + 1) * 2;

		const { selectedType, selectedGoalId, selectedProjectId } = this.props.selected;
		const selectedProject = selectedType === 'project' &&
														selectedGoalId === goalId &&
														selectedProjectId === project.id;
		// console.log(
		// 	'selectedType ', selectedType, ' selectedGoalId ', selectedGoalId, ' selectedProjectId ', selectedProjectId,
		// 	' selectedProject ', selectedProject,
		// );

		const { commandedType } = this.props.command;

		const editProject = (selectedProject && commandedType === 'edit');
		const addTask = (selectedProject && commandedType === 'add');
		// console.log('commandedType ', commandedType, ' editProject ', editProject, ' addTask ', addTask);

		const toggleClass = this.state.listTasks ? 'fa fa-angle-down' : 'fa fa-angle-right';

		const selectedClass = selectedProject ? 'project--selected' : '';
		return (
			<div className="project--container">
				<button
					className="project--project-icon"
					onClick={() => this.onClickToggle()}
				>
					<i className={`${toggleClass}`} />
				</button>
				<button
					className={`project--project ${selectedClass}`}
					data_type="project"
					data_goal_id={goalId}
					data_project_id={project.id}
					data_order_id={count}
					draggable="true"
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
					onClick={() => this.onClickSelectProject(goalId, project)}
				>
					<div className="project--project-text">{project.description}</div>
					{/* <div className="project--project-text">{project.comments}</div> */}
					{/* <div className="project--project-text">{statusUtilities.getStatusOption(project.status)}</div> */}
				</button>
				{(this.state.listTasks || addTask || editProject) &&
					<div>
						{editProject &&
							<div>
								<EditProject goalId={goalId} project={project} />
							</div>
						}
						{addTask &&
							<AddTask goalId={goalId} projectId={project.id} />
						}
						{this.state.listTasks &&
							<ListTasks
								goalId={goalId}
								projectId={project.id}
								tasks={project.tasks}
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

Project.propTypes = {
	goalId: PropTypes.number.isRequired,
	project: projectType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,

	selected: selectType.isRequired,		// eslint-disable-line react/no-typos
	command: commandType.isRequired,		// eslint-disable-line react/no-typos

	actions: PropTypes.shape({
		updateUserProject: PropTypes.func.isRequired,
		selectedProject: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	selected: state.selectedReducer.selected,
	command: state.commandReducer.command,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
