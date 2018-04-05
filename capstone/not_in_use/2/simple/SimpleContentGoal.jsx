
import React from 'react';
import { connect } from 'react-redux';

import OpenMenu from '../OpenMenu';
import SimpleGoal from './SimpleGoal';

import { goalsType, matchType } from '../../types';
import * as goalUtilities from '../../utilities/goalUtilities';

class SimpleContentGoal extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- SimpleContentGoal::constructor, props ', props);
	}

	render() {
		// console.log('--- SimpleContentGoal::render, props ', this.props);
		const id = this.props.match.params.goalId * 1;
		// console.log('find goal id ', id);
		const goal = goalUtilities.goalFromGoalsById(id, this.props.goals);
		// console.log('goal ', goal);
		return (
			<div>
				<section>
					<div>
						<OpenMenu />
						<SimpleGoal goal={goal} />
					</div>
				</section>
			</div>
		);
	}
}

SimpleContentGoal.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
	match: matchType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(SimpleContentGoal);
