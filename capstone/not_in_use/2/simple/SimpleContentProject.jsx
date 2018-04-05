
import React from 'react';
import { connect } from 'react-redux';

import OpenMenu from '../OpenMenu';
import SimpleProject from './SimpleProject';

import { goalsType, matchType } from '../../types';
import * as projectsUtilities from '../../utilities/projectUtilities';

class SimpleContentProject extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- SimpleContentProject::constructor, props ', props);
	}
	render() {
		// console.log('--- SimpleContentProject::render, props ', this.props);
		const id = this.props.match.params.projectId * 1;
		// console.log('find project id ', id);
		const project = projectsUtilities.projectFromGoalsById(id, this.props.goals);
		// console.log('project ', project);
		return (
			<div>
				<section>
					<div>
						<OpenMenu />
						<SimpleProject project={project} />
					</div>
				</section>
			</div>
		);
	}
}

SimpleContentProject.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
	match: matchType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(SimpleContentProject);
