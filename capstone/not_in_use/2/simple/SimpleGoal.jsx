
import React from 'react';

import { goalType } from '../../types';
import SimpleProjects from './SimpleProjects';

const SimpleGoal = (props) => {
	const { goal } = props;
	// console.log('--- SimpleGoal, goal ', goal);
	return (
		<div>
			<br />
			{goal.description}, {goal.comments}, {goal.status}
			<SimpleProjects projects={goal.projects} />
		</div>
	);
};

SimpleGoal.propTypes = {
	goal: goalType.isRequired,
};

export default SimpleGoal;
