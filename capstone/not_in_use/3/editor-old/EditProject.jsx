import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { projectType } from '../../types';

import TextInput from '../../toolbox/TextInput';
import TextArea from '../../toolbox/TextArea';
import Dropdown from '../../toolbox/Dropdown';

import * as statusUtilities from '../../utilities/statusUtilities';

class EditProject extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- EditProject ', props);
		this.updateProjectTitle = this.updateProjectTitle.bind(this);
		this.updateProjectStatus = this.updateProjectStatus.bind(this);
		this.updateProjectDescription = this.updateProjectDescription.bind(this);

		this.onClickCancel = this.onClickCancel.bind(this);
	}

	onClickCancel() {
		this.props.actions.commandInitialize();
	}

	updateProjectTitle(value) {
		// console.log('--- updateProjectTitle, value:', value);
		// console.log('--- updateProjectTitle, this.props ', this.props);
		const { goalId, project } = this.props;
		this.props.actions.updateUserProject(goalId, project.id, { field: 'title', value });
	}

	updateProjectStatus(value) {
		// console.log('--- updateProjectStatus, value:', value);
		const { goalId, project } = this.props;
		this.props.actions.updateUserProject(goalId, project.id, { field: 'status', value: value * 1 });
	}

	updateProjectDescription(value) {
		// console.log('--- updateProjectDescription, value:', value);
		// console.log('--- updateProjectDescription, this.props ', this.props);
		const { goalId, project } = this.props;
		this.props.actions.updateUserProject(goalId, project.id, { field: 'description', value });
	}

	render() {
		// console.log('EditProject::render() props ', this.props);
		const { project } = this.props;
		return (
			<div>
				<button className="project--project-cancel" onClick={() => this.onClickCancel()}>
					<i className="fa fa-times-circle" />
				</button>

				<TextInput
					id="project-0-title"
					name="name"
					inputType="text"
					maxLength="10"
					content={project.title}
					placeholder="Enter project title"
					submit={this.updateProjectTitle}
					required
				/>

				<TextArea
					id="project-0-description"
					rows={5}
					resize={false}
					content={project.description}
					name="description"
					submit={this.updateProjectDescription}
					placeholder="Description"
				/>

				<Dropdown
					name="Status"
					options={statusUtilities.getStatusOptions()}
					selectedOption={project.status}
					submit={this.updateProjectStatus}
				/>
			</div>
		);
	}
}

EditProject.propTypes = {
	goalId: PropTypes.number.isRequired,
	project: projectType.isRequired, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		updateUserProject: PropTypes.func.isRequired,
		commandInitialize: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(EditProject);
