
import React from 'react';

import { taskType } from '../../types';
import SimpleTags from './SimpleTags';

const SimpleTask = (props) => {
	const { task } = props;
	// console.log('--- SimpleTask, task ', task);
	return (
		<div>
			------ {task.description}, <SimpleTags tags={task.tags} />
		</div>
	);
};

SimpleTask.propTypes = {
	task: taskType.isRequired,
};

export default SimpleTask;
