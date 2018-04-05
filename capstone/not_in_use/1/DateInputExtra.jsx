
import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

import { goalsType, taskType } from '../types';
import * as tagsUtilities from '../utilities/tags';

class DateInputExtra extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- DateInputExtra::constructor(), props ', props);
		this.state = {
			term: this.props.value,
			open: false,
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
		// this.submitForm = this.submitForm.bind(this);

		// this.state = {
		// 	goalId: this.props.goalId,
		// 	projectId: this.props.projectId,
		// 	task: this.props.task,
		// };
		// this.handleDelete = this.handleDelete.bind(this);
		// this.handleAddition = this.handleAddition.bind(this);
		// this.handleDrag = this.handleDrag.bind(this);
		// console.log('this.state ', this.state);
	}

	componentDidUpdate() {
		console.log('DateInputExtra::componentDidUpdate');
		if (this.state.open) {
			this.textInput.focus();
		}
	}

	onInputChange(event) {
		console.log('DateInputExtra::onInputChange, event.target.value ', event.target.value);
		this.setState({ term: event.target.value });
		// this.toggle();
	}

	onClick(event) {
		console.log('DateInputExtra::onClick, event ', event);
		this.toggle();
	}

	onBlur(event) {
		console.log('DateInputExtra::onBlur, event ', event);
		this.toggle();
	}

	onFocus(event) {
		console.log('DateInputExtra::onFocus, event ', event);
	}

	toggle() {
		this.setState({ open: !this.state.open });
	}

	render() {
		console.log('DateInputExtra::render');
		const jv = new Date().toString();
		console.log('jv ', jv);
		const display = this.state.term ? this.state.term : 'No Date';
		return (
			<div>
				{!this.state.open &&
					<button
						className="date-input-button"
						onClick={this.onClick}
					>
						{display}
					</button>
				}

				<div>
					{this.state.open &&
						<input
							// tabIndex={0}
							ref={(thisInput) => { this.textInput = thisInput; }}
							className="dateinput"
							type="date"
							value={this.state.term}
							min={this.props.minDate}
							max={this.props.maxDate}
							// min="2018-01-01"
							// max="2018-01-05"
							onChange={this.onInputChange}
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							// {...extraProps}
						/>
					}
				</div>
			</div>
		);
	}
}

DateInputExtra.propTypes = {
	// id: PropTypes.string.isRequired,
	// name: PropTypes.string.isRequired,
	value: PropTypes.string,
	// mindate: PropTypes.instanceOf(Date),
	// maxdate: PropTypes.instanceOf(Date),
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
};

DateInputExtra.defaultProps = {
	value: '',
	minDate: new Date().toString(),
	maxDate: new Date('2018-01-05').toString(),
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateInputExtra);
