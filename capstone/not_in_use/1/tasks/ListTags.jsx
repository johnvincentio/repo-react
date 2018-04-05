
import React from 'react';
import { connect } from 'react-redux';

import OpenMenu from '../OpenMenu';
import Tasks from './Tasks';
import { goalsType } from '../../types';
import * as tagUtilities from '../../utilities/tags';

class ListTags extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- ListTags::constructor, props ', props);
	}
	render() {
		// console.log('--- ListTags::render, props ', this.props);
		const tasks = tagUtilities.tagsListFromGoals(this.props.goals);
		// console.log('tasks ', tasks);
		return (
			<div>
				<section>
					<div>
						<OpenMenu />
						<Tasks tasks={tasks} />
					</div>
				</section>
			</div>
		);
	}
}

ListTags.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(ListTags);
