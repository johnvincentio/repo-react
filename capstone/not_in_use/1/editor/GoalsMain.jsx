
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EditorGoals from './EditorGoals';

import { goalsType, matchType } from '../../types';
import * as taskUtilities from '../../utilities/taskUtilities';
import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as tagUtilities from '../../utilities/tagUtilities';

class GoalsMain extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- GoalsMain::constructor, props ', props);
	}

	render() {
		const { goals, selected } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- GoalsMain::render, selected ', selected, ' param ', param);
		const tmpGoals = JSON.parse(JSON.stringify(goals));
		let partialGoals = [];
		switch (selected) {
			case 'status':
				partialGoals = taskStatusUtilities.dataFromGoalsByStatus(param, tmpGoals);
				break;
			case 'tags':
			case 'tag':
				partialGoals = tagUtilities.dataFromGoalsByTag(param, tmpGoals);
				break;
			case 'tasks':
				partialGoals = taskUtilities.dataFromGoalsByStatus(param, tmpGoals);
				break;
			case 'goals':
			default:
				partialGoals = tmpGoals;
		}
		// console.log('--- GoalsMain::render, partialGoals ', partialGoals);
		return (
			<div>
				<EditorGoals goals={partialGoals} />
			</div>
		);
	}
}

GoalsMain.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
	match: matchType.isRequired,	// eslint-disable-line react/no-typos
	selected: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(GoalsMain);
