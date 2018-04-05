
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/';
import { taskListType } from '../../types';

import TextInput from '../../toolbox/TextInput';
import TextArea from '../../toolbox/TextArea';
import Dropdown from '../../toolbox/Dropdown';
import Tags from '../../toolbox/Tags';
import DateTimeInput from '../../toolbox/DateTimeInput';

import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as taskRepeatUtilities from '../../utilities/taskRepeatUtilities';
import * as dateUtilities from '../../utilities/datesUtilities';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.updateTaskDescription = this.updateTaskDescription.bind(this);
		this.updateTaskStatus = this.updateTaskStatus.bind(this);
		this.updateTaskRepeat = this.updateTaskRepeat.bind(this);
		this.updateTaskStartDate = this.updateTaskStartDate.bind(this);
		this.updateTaskEndDate = this.updateTaskEndDate.bind(this);
		this.updateTaskEstimate = this.updateTaskEstimate.bind(this);
		this.updateTaskActual = this.updateTaskActual.bind(this);
		this.updateTaskComments = this.updateTaskComments.bind(this);
	}

	updateTaskDescription(value) {
		// console.log('--- updateTaskDescription, value:', value);
		// console.log('--- updateTaskDescription, this.props ', this.props);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		this.props.actions.updateUserTask(
			goal.id, project.id, task.id,
			{ field: 'description', value },
		);
	}

	updateTaskComments(value) {
		// console.log('--- updateTaskComments, value:', value);
		// console.log('--- updateTaskComments, this.props ', this.props);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		this.props.actions.updateUserTask(
			goal.id, project.id, task.id,
			{ field: 'comments', value },
		);
	}

	updateTaskEstimate(value) {
		// console.log('--- updateTaskEstimate, value:', value);
		// console.log('--- updateTaskEstimate, this.props ', this.props);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		this.props.actions.updateUserTask(
			goal.id, project.id, task.id,
			{ field: 'estimate', value },
		);
	}

	updateTaskActual(value) {
		// console.log('--- updateTaskActual, value:', value);
		// console.log('--- updateTaskActual, this.props ', this.props);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		this.props.actions.updateUserTask(
			goal.id, project.id, task.id,
			{ field: 'actual', value },
		);
	}

	updateTaskStatus(value) {
		// console.log('--- updateTaskStatus, value:', value);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		this.props.actions.updateUserTask(
			goal.id, project.id, task.id,
			{ field: 'status', value: value * 1 },
		);
	}

	updateTaskRepeat(value) {
		// console.log('--- updateTaskRepeat, value:', value, ' props ', this.props);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		this.props.actions.updateUserTask(
			goal.id, project.id, task.id,
			{ field: 'repeat', value: value * 1 },
		);
	}

	updateTaskStartDate(value) {
		// console.log('--- updateTaskStartDate, value:', value, ' props ', this.props);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		// console.log('--- updateTaskStartDate, task:', task);
		this.props.actions.updateUserDateTask(
			goal.id, project.id, task.id,
			{ field: 'start', value },
		);
	}
	updateTaskEndDate(value) {
		// console.log('--- updateTaskEndDate, value:', value, ' props ', this.props);
		const { taskList } = this.props;
		const { goal, project, task } = taskList;
		// console.log('--- updateTaskEndDate, task:', task);
		this.props.actions.updateUserDateTask(
			goal.id, project.id, task.id,
			{ field: 'end', value },
		);
	}

	render() {
		const { taskList } = this.props;
		const { goal, project, task } = taskList;

		const today = dateUtilities.createToday();
		const ending = dateUtilities.createMaxDate(task.start);
		// console.log('today ', today);
		// console.log('ending ', ending);
		const start = dateUtilities.transformDateObject(task.start);
		const end = dateUtilities.transformDateObject(task.end);
		// console.log('start ', start, ' task.start ', task.start);
		// console.log('end ', end, ' task.end ', task.end);

		// console.log('--- Task, taskList ', taskList);

		// const text = taskList.task.tags.reduce((a, b) =>
		// 	a + b.description, '');

		// const text = task.tags.reduce((a, b) =>
		// 	`${a} ${b.description} `, '');

		// console.log('--- Task, text ', text);

		return (
			<tr>
				<td className="tasks--table-column">
					<TextInput
						id="task-0-description"
						name="name"
						inputType="text"
						maxLength="10"
						content={task.description}
						placeholder="Enter task description"
						submit={this.updateTaskDescription}
						required
					/>
				</td>
				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<Link to={`/goal/${goal.id}`}>
							<button>{goal.description}</button>
						</Link>
					</div>
				</td>
				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<Link to={`/project/${project.id}`}>
							<button>{project.description}</button>
						</Link>
					</div>
				</td>
				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<Dropdown
							name="Status"
							options={taskStatusUtilities.taskStatusOptions()}
							selectedOption={taskStatusUtilities.taskStatusValue(task.status)}
							submit={this.updateTaskStatus}
						/>
					</div>
				</td>
				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<DateTimeInput
							value={start}
							minDate={today}
							maxDate={end}
							submit={this.updateTaskStartDate}
						/>
					</div>
				</td>
				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<DateTimeInput
							value={end}
							minDate={start}
							maxDate={ending}
							submit={this.updateTaskEndDate}
						/>
					</div>
				</td>
				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<Dropdown
							name="Repeat"
							options={taskRepeatUtilities.taskRepeatOptions()}
							selectedOption={taskRepeatUtilities.taskRepeatValue(task.repeat)}
							submit={this.updateTaskRepeat}
						/>
					</div>
				</td>

				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<Tags
							goalId={goal.id}
							projectId={project.id}
							task={task}
						/>
					</div>
				</td>

				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<TextInput
							id="task-0-estimate"
							name="estimate"
							inputType="text"
							// maxLength="5"
							content={task.estimate}
							placeholder="Estimate"
							submit={this.updateTaskEstimate}
						/>
					</div>
				</td>

				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<TextInput
							id="task-0-actual"
							name="actual"
							inputType="text"
							// maxLength="5"
							content={task.actual}
							placeholder="Actual"
							submit={this.updateTaskActual}
						/>
					</div>
				</td>

				<td className="tasks--table-column">
					<div className="tasks--table-column-div">
						<TextArea
							id="task-0-comments"
							rows={5}
							resize={false}
							content={task.comments}
							name="comments"
							submit={this.updateTaskComments}
							placeholder="Comments"
						/>
					</div>
				</td>
			</tr>
		);
	}
}

Task.propTypes = {
	taskList: taskListType.isRequired,	// eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		updateUserTask: PropTypes.func.isRequired,
		updateUserDateTask: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(Task);
