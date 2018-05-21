import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';

import * as actions from '../../redux/actions/';
import { projectsType } from '../../types';
import { ListProject } from './';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 10px 20px;
`;

class ListProjects extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ListProjects::constructor ', props);
		this.getDraggedElement = this.props.getDraggedElement.bind(this);
		this.setDraggedElement = this.props.setDraggedElement.bind(this);
	}

	render() {
		// console.log('ListProjects::render() props ', this.props);
		const div = this.props.projects.map((project, idx) => 
			// console.log('project ', project);
			 (
				<ListProject
					key={`project_key_${this.props.goalId}_${project.projectid}`}
					goalId={this.props.goalId}
					project={project}
					idx={idx}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			)
		);
		return <Container>{div}</Container>;
	}
}

ListProjects.propTypes = {
	projects: projectsType.isRequired, // eslint-disable-line react/no-typos
	goalId: PropTypes.number.isRequired,
	getDraggedElement: PropTypes.func.isRequired,
	setDraggedElement: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(ListProjects);
