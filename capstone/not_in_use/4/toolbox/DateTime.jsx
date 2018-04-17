
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

import { dateTimeType } from '../types';

// min="2018-01-01"
// max="2018-01-05"

class DateTime extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- DateTime::constructor(), props ', props);
		this.state = {
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
		// console.log('DateTime::componentDidUpdate(), props ', this.props);
		if (this.state.openDate) {
			this.dateInput.focus();
		}
		if (this.state.openTime) {
			this.timeInput.focus();
		}
	}

	onDateChange(event) {
		// console.log('DateTime::onDateChange, event.target.value ', event.target.value);
		this.props.onDateChange(event.target.value);
	}

	onTimeChange(event) {
		// console.log('DateTime::onTimeChange, event.target.value ', event.target.value);
		this.props.onTimeChange(event.target.value);
	}

	onClickDate(event) {
		event.preventDefault();
		// console.log('DateTime::onClickDate, event ', event);
		this.toggleDate();
	}
	onClickTime(event) {
		event.preventDefault();
		// console.log('DateTime::onClickTime, event ', event);
		this.toggleTime();
	}

	onBlurDate(event) {
		event.preventDefault();
		// console.log('DateTime::onBlurDate, event ', event);
		this.toggleDate();
	}
	onBlurTime(event) {
		event.preventDefault();
		// console.log('DateTime::onBlurTime, event ', event);
		this.toggleTime();
	}

	toggleDate() {
		this.setState({ openDate: !this.state.openDate });
	}
	toggleTime() {
		this.setState({ openTime: !this.state.openTime });
	}

	render() {
		// console.log('DateTime::render(), props ', this.props);
		const displayDate = this.props.value.date ? this.props.value.date : 'No Date';
		const displayTime = this.props.value.time ? this.props.value.time : 'No Time';
		// console.log('displayDate ', displayDate, ' displayTime ', displayTime);
		// console.log('this.props.minDate ', this.props.minDate, ' this.props.maxDate ', this.props.maxDate);
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

				{(!this.state.openDate && this.props.value.date && !this.state.openTime) &&
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
							value={this.props.value.date}
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
							value={this.props.value.time}
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

DateTime.propTypes = {
	value: dateTimeType.isRequired,	// eslint-disable-line react/no-typos
	minDate: dateTimeType.isRequired,	// eslint-disable-line react/no-typos
	maxDate: dateTimeType.isRequired,	// eslint-disable-line react/no-typos
	onDateChange: PropTypes.func.isRequired,
	onTimeChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(DateTime);
