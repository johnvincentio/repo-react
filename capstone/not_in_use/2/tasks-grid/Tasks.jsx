
import React from 'react';

import { tasksListType } from '../../types';
import Task from './Task';

const Tasks = (props) => {
	const { tasks } = props;
	// console.log('--- Tasks, tasks ', tasks);
	const div = tasks.map(item => (
		<Task key={`tasks-${item.task.id}`} taskList={item} />
	));
	return (
		<div className="tasks--container">
			<table className="tasks--table">
				<tbody>
					<tr>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Task</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Goal</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Project</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Status</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Start</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">End</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Repeat</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Tags</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Estimate</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Actual</div>
						</td>
						<td className="tasks--table-header">
							<div className="tasks--table-header-div">Comments</div>
						</td>
					</tr>
					{ div }
				</tbody>
			</table>
		</div>
	);
};

Tasks.propTypes = {
	tasks: tasksListType.isRequired,
};

export default Tasks;

