
import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

// import { goalsType, taskType } from '../types';
// import * as tagUtilities from '../utilities/tagUtilities';

class DateInput extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- DateInput::constructor(), props ', props);
		this.state = {
			term: this.props.value,
			buttonsOpen: true,
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		// this.onClick = this.onClick.bind(this);
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

	onInputChange(event) {
		console.log('DateInput::onInputChange, event.target.value ', event.target.value);
		this.setState({ term: event.target.value });
	}

	// onClick(event) {
	// 	console.log('DateInput::onClick, event ', event);
	// 	// this.setState({ term: event.target.value });
	// }

	onFormSubmit(event) {
		console.log('DateInput::onFormSubmit');
		event.preventDefault();
		// this.props.submit(this.state.term);
		// this.setState({ buttonsOpen: false });
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
					<label htmlFor={this.props.id} className="form-label">{this.props.title}
						<input
							id={this.props.id}
							className="dateinput"
							name={this.props.name}
							type="date"
							value={this.state.term}
							min={this.props.mindate}
							max={this.props.maxdate}
							onChange={this.onInputChange}
							placeholder={this.props.placeholder}
							// onClick={this.onClick}
							// {...extraProps}
						/>
					</label>
					{this.state.buttonsOpen &&
						<div>
							<button type="submit">Submit</button>
						</div>
					}
				</form>
			</div>
		);
	}
}

DateInput.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	mindate: PropTypes.instanceOf(Date),
	maxdate: PropTypes.instanceOf(Date),

	// goals: goalsType.isRequired,		// eslint-disable-line react/no-typos
	// goalId: PropTypes.number.isRequired,
	// projectId: PropTypes.number.isRequired,
	// task: taskType.isRequired,		// eslint-disable-line react/no-typos
	// actions: PropTypes.shape({
	// 	addUserTaskTag: PropTypes.func.isRequired,
	// 	deleteUserTaskTag: PropTypes.func.isRequired,
	// 	moveUserTaskTag: PropTypes.func.isRequired,
	// }).isRequired,
};

DateInput.defaultProps = {
	title: '',
	value: '',
	mindate: new Date(),
	maxdate: new Date('2019-12-31'),
	placeholder: '',
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateInput);

/*
{this.state.buttonsOpen &&
	<div>
		{<input type="submit" value="Submit" />}
		<button type="submit">Submit</button>
		<button onClick={this.onCancel}>Cancel</button>
	</div>
}
*/
