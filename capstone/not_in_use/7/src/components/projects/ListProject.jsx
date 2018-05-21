import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/';
import { projectType } from '../../types';

import { ProjectCard } from './';

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
			<div key={`project_outer_key_${this.props.goalId}_${project.projectid}_${idx}`}>
				<ProjectCard
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
	project: projectType.isRequired, // eslint-disable-line react/no-typos
	idx: PropTypes.number.isRequired,

	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(ListProject);
