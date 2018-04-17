
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

import { dateTimeType } from '../types';

// min="2018-01-01"
// max="2018-01-05"

class DateTimeInput extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- DateTimeInput::constructor(), props ', props);
		this.state = {
			date: this.props.value.date,
			time: this.props.value.time,
			openDate: false,
			openTime: false,
		};
		this.onDateChange = this.onDateChange.bind(this);
		this.onTimeChange = this.onTimeChange.bind(this);
		this.onClickDate = this.onClickDate.bind(this);
		this.onClickTime = this.onClickTime.bind(this);
		this.onBlurDate = this.onBlurDate.bind(this);
		this.onBlurTime = this.onBlurTime.bind(this);
	}

	componentDidUpdate() {
		// console.log('DateTimeInput::componentDidUpdate(), props ', this.props);
		if (this.state.openDate) {
			this.dateInput.focus();
		}
		if (this.state.openTime) {
			this.timeInput.focus();
		}
	}

	onDateChange(event) {
		// console.log('DateTimeInput::onDateChange, event.target.value ', event.target.value);
		this.setState({ date: event.target.value });
		this.props.submit({ field: 'date', value: event.target.value });
	}

	onTimeChange(event) {
		// console.log('DateTimeInput::onTimeChange, event.target.value ', event.target.value);
		this.setState({ time: event.target.value });
		this.props.submit({ field: 'time', value: event.target.value });
	}

	onClickDate(event) {
		// console.log('DateTimeInput::onClickDate, event ', event);
		this.toggleDate();
	}
	onClickTime(event) {
		// console.log('DateTimeInput::onClickTime, event ', event);
		this.toggleTime();
	}

	onBlurDate(event) {
		// console.log('DateTimeInput::onBlurDate, event ', event);
		this.toggleDate();
	}
	onBlurTime(event) {
		// console.log('DateTimeInput::onBlurTime, event ', event);
		this.toggleTime();
	}

	toggleDate() {
		this.setState({ openDate: !this.state.openDate });
	}
	toggleTime() {
		this.setState({ openTime: !this.state.openTime });
	}

	render() {
		// console.log('DateTimeInput::render(), props ', this.props);
		const displayDate = this.state.date ? this.state.date : 'No Date';
		const displayTime = this.state.time ? this.state.time : 'No Time';
		// console.log('displayDate ', displayDate, ' displayTime ', displayTime);
		return (
			<div>
				{!this.state.openDate &&
					<button
						className="date-input-button"
						onClick={this.onClickDate}
					>
						{displayDate}
					</button>
				}

				{(!this.state.openDate && this.state.date) &&
					<button
						className="date-input-button"
						onClick={this.onClickTime}
					>
						{displayTime}
					</button>
				}

				<div>
					{this.state.openDate &&
						<input
							ref={(thisDateInput) => { this.dateInput = thisDateInput; }}
							className="dateinput"
							type="date"
							value={this.state.date}
							min={this.props.minDate.date}
							max={this.props.maxDate.date}
							onChange={this.onDateChange}
							onBlur={this.onBlurDate}
							// {...extraProps}
						/>
					}
					{this.state.openTime &&
						<input
							ref={(thisTimeInput) => { this.timeInput = thisTimeInput; }}
							className="timeinput"
							type="time"
							value={this.state.time}
							min={this.props.minDate.time}
							max={this.props.maxDate.time}
							onChange={this.onTimeChange}
							onBlur={this.onBlurTime}
							// {...extraProps}
						/>
					}
				</div>
			</div>
		);
	}
}

DateTimeInput.propTypes = {
	value: dateTimeType.isRequired,	// eslint-disable-line react/no-typos
	minDate: dateTimeType.isRequired,	// eslint-disable-line react/no-typos
	maxDate: dateTimeType.isRequired,	// eslint-disable-line react/no-typos
	submit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateTimeInput);

// this.state = {
// 	goalId: this.props.goalId,
// 	projectId: this.props.projectId,
// 	task: this.props.task,
// };
// this.handleDelete = this.handleDelete.bind(this);
// this.handleAddition = this.handleAddition.bind(this);
// this.handleDrag = this.handleDrag.bind(this);
// console.log('this.state ', this.state);
