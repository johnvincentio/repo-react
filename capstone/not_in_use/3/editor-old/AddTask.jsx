import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import Input from '../../toolbox/Input';
import Select from '../../toolbox/Select';
import DateTime from '../../toolbox/DateTime';

import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as taskRepeatUtilities from '../../utilities/taskRepeatUtilities';
import * as dateUtilities from '../../utilities/datesUtilities';

class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			status: 0,
			start: { date: '', time: '' },
			end: { date: '', time: '' },
			repeat: 0,
			estimate: '',
			actual: '',
			tags: [],
			suggestions: []
		};
		console.log('--- AddTask ', props);
		this.onInputChange = this.onInputChange.bind(this);
		this.onStatusChange = this.onStatusChange.bind(this);

		this.onStartDateChange = this.onStartDateChange.bind(this);
		this.onStartTimeChange = this.onStartTimeChange.bind(this);
		this.onEndDateChange = this.onEndDateChange.bind(this);
		this.onEndTimeChange = this.onEndTimeChange.bind(this);

		this.onRepeatChange = this.onRepeatChange.bind(this);
		this.onEstimateChange = this.onEstimateChange.bind(this);
		this.onActualChange = this.onActualChange.bind(this);

		this.handleTagDelete = this.handleTagDelete.bind(this);
		this.handleTagAddition = this.handleTagAddition.bind(this);
		this.handleTagDrag = this.handleTagDrag.bind(this);

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		const { target } = event;
		const { name, value } = target;
		this.setState({ [name]: value });
	}

	onStatusChange(value) {
		this.setState({ status: value * 1 });
	}

	onStartDateChange(value) {
		// console.log('AddTask::onStartDateChange; value ', value);
		const start = { date: value, time: this.state.start.time };
		this.setState({ start });
	}
	onStartTimeChange(value) {
		// console.log('AddTask::onStartTimeChange; value ', value);
		const start = { date: this.state.start.date, time: value };
		this.setState({ start });
	}
	onEndDateChange(value) {
		// console.log('AddTask::onEndDateChange; value ', value);
		const end = { date: value, time: this.state.end.time };
		this.setState({ end });
	}
	onEndTimeChange(value) {
		// console.log('AddTask::onEndTimeChange; value ', value);
		const end = { date: this.state.end.date, time: value };
		this.setState({ end });
	}

	onRepeatChange(value) {
		this.setState({ repeat: value * 1 });
	}
	onEstimateChange(value) {
		this.setState({ estimate: value });
	}
	onActualChange(value) {
		this.setState({ actual: value });
	}

	onFormSubmit(event) {
		// console.log('AddTask::onFormSubmit');
		event.preventDefault();
		this.props.actions.addUserTask(this.props.goalId, this.props.projectId, this.state);
		this.props.actions.commandInitialize();
	}

	handleTagAddition(tag) {
		// console.log('--- AddTask::handleTagAddition(), tag ', tag);
		const { tags } = this.state;
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		this.setState({ tags });
	}

	handleTagDelete(index) {
		// console.log('--- AddTask::handleTagDelete(), index ', index);
		const { tags } = this.state;
		tags.splice(index, 1);
		this.setState({ tags });
	}

	handleTagDrag(tag, currPos, newPos) {
		// console.log('--- AddTask::handleTagDrag(), tag ', tag, ' currPos ', currPos, ' newPos ', newPos);
		const { tags } = this.state;

		tags.splice(currPos, 1); // mutate array
		tags.splice(newPos, 0, tag);

		this.setState({ tags });
	}

	/*
	id: 11,
	title: 'Goal1/Project1/Task1',
	description: 'Goal1/Project1/Task1 description',
	tags: [],
	status: 50,
	start: { date: '2018-02-10' },
	end: { date: '2018-02-11', time: '12:30' },
	repeat: 50,
	estimate: '3d',
	actual: '3d',
	*/
	render() {
		// console.log('AddTask::render() props ', this.props);
		// const showProperties = this.state.title !== '';
		const showProperties = true;

		const today = dateUtilities.createToday();
		const ending = dateUtilities.transformDateObject('2025-01-01 00:00');
		// console.log('today ', today);
		// console.log('ending ', ending);
		const start = dateUtilities.transformDateObject(this.state.start);
		const end = dateUtilities.transformDateObject(this.state.end);

		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
					<div>
						<input
							required
							placeholder="Enter your new Task"
							name="title"
							value={this.state.title}
							onChange={this.onInputChange}
						/>
					</div>
					{showProperties && (
						<div>
							<textarea
								rows="3"
								placeholder="Description"
								name="description"
								value={this.state.description}
								onChange={this.onInputChange}
							/>
						</div>
					)}
					{showProperties && (
						<div>
							<Select
								name="Status"
								options={taskStatusUtilities.taskStatusOptions()}
								selectedOption={this.state.status}
								onSelectChange={this.onStatusChange}
							/>
							<DateTime
								value={start}
								minDate={today}
								maxDate={end}
								onDateChange={this.onStartDateChange}
								onTimeChange={this.onStartTimeChange}
							/>
							<DateTime
								value={end}
								minDate={start}
								maxDate={ending}
								onDateChange={this.onEndDateChange}
								onTimeChange={this.onEndTimeChange}
							/>
							<Select
								name="Repeat"
								options={taskRepeatUtilities.taskRepeatOptions()}
								selectedOption={this.state.repeat}
								onSelectChange={this.onRepeatChange}
							/>
							<ReactTags
								tags={this.state.tags}
								suggestions={this.state.suggestions}
								minQueryLength={2}
								autocomplete
								handleDelete={this.handleTagDelete}
								handleAddition={this.handleTagAddition}
								handleDrag={this.handleTagDrag}
							/>
							<Input
								id="task-0-estimate"
								name="estimate"
								inputType="text"
								maxLength="10"
								content={this.state.estimate}
								title="estimate"
								placeholder="Enter task estimate"
								onInputChange={this.onEstimateChange}
							/>
							<Input
								id="task-0-actual"
								name="actual"
								inputType="text"
								maxLength="10"
								content={this.state.actual}
								title="actual"
								placeholder="Enter task actual"
								onInputChange={this.onActualChange}
							/>
						</div>
					)}
					<span>
						<button type="submit" className="submit-button">
							Add Task
						</button>
					</span>
				</form>
			</div>
		);
	}
}

AddTask.propTypes = {
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	actions: PropTypes.shape({
		addUserTask: PropTypes.func.isRequired,
		commandInitialize: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(AddTask);
