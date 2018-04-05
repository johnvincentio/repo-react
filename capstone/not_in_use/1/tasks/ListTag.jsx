
import React from 'react';
import { connect } from 'react-redux';

import OpenMenu from '../OpenMenu';
import Tasks from './Tasks';

import { goalsType, matchType } from '../../types';
import * as tagUtilities from '../../utilities/tags';

class ListTag extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- ListTag::constructor, props ', props);
	}

	render() {
		// console.log('--- ListTag::render, props ', this.props);
		const { tag } = this.props.match.params;
		// console.log('find tag tag ', tag);
		const tasks = tagUtilities.tagsListFromGoalsByTag(tag, this.props.goals);
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

ListTag.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
	match: matchType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(ListTag);
