
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { projectType } from '../../types';

import * as statusUtilities from '../../utilities/statusUtilities';

class EditProject extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.project.description,
			comments: props.project.comments,
			status: props.project.status,
		};
		// console.log('--- EditProject ', props);
		this.onInputChange = this.onInputChange.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		const { target } = event;
		const { name, value } = target;
		// console.log('onInputChange, name ', name, ' value ', value, ' event ', event.target);
		// console.log('type ', event.target.type);
		this.setState({ [name]: value });
	}

	onSelectChange(event) {
		const { target } = event;
		const { value } = target;
		// console.log('onSelectChange, name ', name, ' value ', value, ' event ', event.target);
		this.setState({ status: value * 1 });
	}

	onFormSubmit(event) {
		// console.log('--- EditProject::onFormSubmit, this.state.description ', this.state.description);
		event.preventDefault();
		const { goalId, project } = this.props;
		const { description, comments, status } = this.state;
		this.props.actions.updateUserProject(goalId, project.id, { field: 'description', value: description });
		this.props.actions.updateUserProject(goalId, project.id, { field: 'comments', value: comments });
		this.props.actions.updateUserProject(goalId, project.id, { field: 'status', value: status });
		this.props.actions.commandInitialize();
	}

	/* eslint-disable class-methods-use-this */
	renderOptions() {
		return statusUtilities.getStatusOptions().map(opt => (
			<option
				key={opt.id}
				value={opt.id}
			>
				{opt.title}
			</option>
		));
	}

	render() {
		// console.log('EditProject::render() props ', this.props);
		const showProperties = this.state.description !== '';
		return (
			<div className="form-group">
				<form onSubmit={this.onFormSubmit}>
					<div>
						<input
							required
							placeholder="Enter your Project"
							name="description"
							value={this.state.description}
							onChange={this.onInputChange}
						/>
					</div>
					{showProperties &&
						<div>
							<textarea
								rows="3"
								placeholder="Comments"
								name="comments"
								value={this.state.comments}
								onChange={this.onInputChange}
							/>
						</div>
					}
					{showProperties &&
						<div>
							<select
								required
								name="status"
								value={this.state.status}
								onChange={this.onSelectChange}
								className="form-select"
							>
								{this.renderOptions(this.state.status)}
							</select>
						</div>
					}
					<span>
						<button type="submit" className="submit-button">Update</button>
					</span>
				</form>
			</div>
		);
	}
}

EditProject.propTypes = {
	goalId: PropTypes.number.isRequired,
	project: projectType.isRequired,		// eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		updateUserProject: PropTypes.func.isRequired,
		commandInitialize: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(EditProject);
