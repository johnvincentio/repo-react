import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { goalsType, taskType } from '../../types';

import TextInput from '../../toolbox/TextInput';
import TextArea from '../../toolbox/TextArea';
import Dropdown from '../../toolbox/Dropdown';
import Tags from '../../toolbox/Tags';
import DateTimeInput from '../../toolbox/DateTimeInput';

import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as taskRepeatUtilities from '../../utilities/taskRepeatUtilities';
import * as dateUtilities from '../../utilities/datesUtilities';
import * as projectUtilities from '../../utilities/projectUtilities';

class TaskEditViewer extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- TaskEditViewer ', props);
		this.updateTaskTitle = this.updateTaskTitle.bind(this);
		this.updateTaskStatus = this.updateTaskStatus.bind(this);
		this.updateTaskStartDate = this.updateTaskStartDate.bind(this);
		this.updateTaskEndDate = this.updateTaskEndDate.bind(this);
		this.updateTaskRepeat = this.updateTaskRepeat.bind(this);
		this.updateTaskEstimate = this.updateTaskEstimate.bind(this);
		this.updateTaskActual = this.updateTaskActual.bind(this);
		this.updateTaskDescription = this.updateTaskDescription.bind(this);

		this.updateTaskProject = this.updateTaskProject.bind(this);

		this.onClickCancel = this.onClickCancel.bind(this);
	}

	onClickCancel() {
		this.props.actions.commandInitialize();
	}

	updateTaskTitle(value) {
		// console.log('--- updateTaskTitle, value:', value);
		// console.log('--- updateTaskTitle, this.props ', this.props);
		const { goalId, projectId, task } = this.props;
		this.props.actions.updateUserTask(goalId, projectId, task.id, {
			field: 'title',
			value
		});
	}

	updateTaskStatus(value) {
		// console.log('--- updateTaskStatus, value:', value);
		const { goalId, projectId, task } = this.props;
		this.props.actions.updateUserTask(goalId, projectId, task.id, {
			field: 'status',
			value: value * 1
		});
	}

	updateTaskStartDate(value) {
		// console.log('--- updateTaskStartDate, value:', value, ' props ', this.props);
		const { goalId, projectId, task } = this.props;
		// console.log('--- updateTaskStartDate, task:', task);
		this.props.actions.updateUserDateTask(goalId, projectId, task.id, {
			field: 'start',
			value
		});
	}

	updateTaskEndDate(value) {
		// console.log('--- updateTaskEndDate, value:', value, ' props ', this.props);
		const { goalId, projectId, task } = this.props;
		// console.log('--- updateTaskEndDate, task:', task);
		this.props.actions.updateUserDateTask(goalId, projectId, task.id, {
			field: 'end',
			value
		});
	}

	updateTaskRepeat(value) {
		// console.log('--- updateTaskRepeat, value:', value, ' props ', this.props);
		const { goalId, projectId, task } = this.props;
		this.props.actions.updateUserTask(goalId, projectId, task.id, {
			field: 'repeat',
			value: value * 1
		});
	}

	updateTaskEstimate(value) {
		// console.log('--- updateTaskEstimate, value:', value);
		// console.log('--- updateTaskEstimate, this.props ', this.props);
		const { goalId, projectId, task } = this.props;
		this.props.actions.updateUserTask(goalId, projectId, task.id, {
			field: 'estimate',
			value
		});
	}

	updateTaskActual(value) {
		// console.log('--- updateTaskActual, value:', value);
		// console.log('--- updateTaskActual, this.props ', this.props);
		const { goalId, projectId, task } = this.props;
		this.props.actions.updateUserTask(goalId, projectId, task.id, {
			field: 'actual',
			value
		});
	}

	updateTaskDescription(value) {
		// console.log('--- updateTaskDescription, value:', value);
		// console.log('--- updateTaskDescription, this.props ', this.props);
		const { goalId, projectId, task } = this.props;
		this.props.actions.updateUserTask(goalId, projectId, task.id, {
			field: 'description',
			value
		});
	}

	updateTaskProject(value) {
		// console.log('--- updateTaskProject, update_project_id:', value);
		const { goalId, projectId, task } = this.props;
		const drag = {
			goalId,
			projectId,
			taskId: task.id
		};
		const drop = {
			goalId,
			projectId: value * 1,
			taskId: task.id
		};
		this.props.actions.moveUserTaskProject(drag, drop);
		this.props.actions.selectedInitialize();
	}

	render() {
		console.log('EditTask::render() props ', this.props);
		const { goals } = this.props;
		const { goalId, projectId, task } = this.props;
		const today = dateUtilities.createToday();
		const ending = dateUtilities.createMaxDate(task.start);
		// console.log('today ', today);
		// console.log('ending ', ending);
		const start = dateUtilities.transformDateObject(task.start);
		const end = dateUtilities.transformDateObject(task.end);
		return (
			<div className="taskeditviewer--card">
				<div className="taskeditviewer--card-top">
					<Dropdown
						className="taskeditviewer--card-status"
						name="Status"
						options={taskStatusUtilities.taskStatusOptions()}
						selectedOption={task.status}
						submit={this.updateTaskStatus}
					/>

					<button className="taskeditviewer--card-cancel" onClick={() => this.onClickCancel()}>
						<i className="fa fa-times-circle" />
					</button>
				</div>

				<div className="taskeditviewer--card-main">
					<TextInput
						id={`task-title-${goalId}-${projectId}-${task.id}`}
						className="taskeditviewer--card-title"
						name="name"
						inputType="text"
						maxLength="10"
						content={task.title}
						placeholder="Enter task title"
						submit={this.updateTaskTitle}
						required
					/>
				</div>

				<div className="taskeditviewer--card-dates">
					<DateTimeInput value={start} minDate={today} maxDate={end} submit={this.updateTaskStartDate} />

					<DateTimeInput value={end} minDate={start} maxDate={ending} submit={this.updateTaskEndDate} />
				</div>

				<Dropdown
					name="project"
					options={projectUtilities.projectsListOptions(goalId, goals)}
					selectedOption={projectUtilities.projectsListOption(goalId, projectId, goals)}
					submit={this.updateTaskProject}
				/>

				<Dropdown
					name="Repeat"
					options={taskRepeatUtilities.taskRepeatOptions()}
					selectedOption={taskRepeatUtilities.taskRepeatValue(task.repeat)}
					submit={this.updateTaskRepeat}
				/>

				<Tags goalId={goalId} projectId={projectId} task={task} />

				<TextInput
					id="task-0-estimate"
					name="estimate"
					inputType="text"
					// maxLength="5"
					content={task.estimate}
					placeholder="Estimate"
					submit={this.updateTaskEstimate}
				/>

				<TextInput
					id="task-0-actual"
					name="actual"
					inputType="text"
					// maxLength="5"
					content={task.actual}
					placeholder="Actual"
					submit={this.updateTaskActual}
				/>
				<TextArea
					id="task-0-description"
					rows={5}
					resize={false}
					content={task.description}
					name="description"
					submit={this.updateTaskDescription}
					placeholder="Description"
				/>
			</div>
		);
	}
}

TaskEditViewer.propTypes = {
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType.isRequired, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		updateUserTask: PropTypes.func.isRequired,
		updateUserDateTask: PropTypes.func.isRequired,
		moveUserTaskProject: PropTypes.func.isRequired,
		commandInitialize: PropTypes.func.isRequired,
		selectedInitialize: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditViewer);
