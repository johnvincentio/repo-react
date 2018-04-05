
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { goalsType } from '../../types';
import * as actions from '../../actions/';
import * as projectUtilities from '../../utilities/projectUtilities';

class SimpleProjectsLink extends React.Component {
	constructor(props) {		// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- SimpleProjectsLink::constructor ', props);
	}

	render() {
		// console.log('SimpleProjectsLink::render(), props ', this.props);
		const arr = projectUtilities.projectsFromGoals(this.props.goals);
		// console.log('arr ', arr);
		const links = arr.map(project => (
			<div key={project.id}>
				<Link to={`/simple/project/${project.id}`}>
					<button>{project.description}</button>
				</Link>
			</div>
		));
		return links;
	}
}

SimpleProjectsLink.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleProjectsLink);
