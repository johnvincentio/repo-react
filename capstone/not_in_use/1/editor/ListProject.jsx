
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { projectType } from '../../types';
import ProjectDrop from './ProjectDrop';
import Project from './Project';

class ListProject extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ListProject::constructor ', props);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
	}

	render() {
		// console.log('ListProject::render() props ', this.props);
		const { goalId, project, idx } = this.props;
		return (
			<div key={`project_outer_key_${this.props.goalId}_${project.id}_${idx}`}>
				<ProjectDrop
					goalId={goalId}
					project={project}
					idx={idx}
					getDraggedElement={this.getDraggedElement}
				/>
				<Project
					goalId={goalId}
					project={project}
					idx={idx}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			</div>
		);
	}
}

ListProject.propTypes = {
	goalId: PropTypes.number.isRequired,
	project: projectType.isRequired,		// eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(ListProject);
