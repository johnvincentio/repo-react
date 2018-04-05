
import React from 'react';
import { connect } from 'react-redux';

import OpenMenu from '../OpenMenu';

import SimpleProjects from './SimpleProjects';

import { goalsType } from '../../types';
import * as projectsUtilities from '../../utilities/projectUtilities';

class SimpleContentProjects extends React.Component {		// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- SimpleContentProjects::constructor, props ', props);
	}
	render() {
		// console.log('--- SimpleContentProjects::render, props ', this.props);
		const projects = projectsUtilities.projectsFromGoals(this.props.goals);
		return (
			<div>
				<section>
					<div>
						<OpenMenu />
						<SimpleProjects projects={projects} />
					</div>
				</section>
			</div>
		);
	}
}

SimpleContentProjects.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(SimpleContentProjects);
