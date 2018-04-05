
import React from 'react';

import { tasksType } from '../../types';
import SimpleTask from './SimpleTask';

const SimpleTasks = (props) => {
	const { tasks } = props;
	// console.log('--- SimpleTasks, tasks ', tasks);
	const div = tasks.map(task => (
		<div key={`task-${task.id}`}>
			<SimpleTask task={task} />
		</div>
	));
	return (
		<div>
			<br />
			{ div }
		</div>
	);
};

SimpleTasks.propTypes = {
	tasks: tasksType.isRequired,
};

export default SimpleTasks;

