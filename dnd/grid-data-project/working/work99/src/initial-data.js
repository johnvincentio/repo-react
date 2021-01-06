
const initialData = {
	tasks: [
		{ id: 'task-1', content: '1 - Take out the garbage', status: 'Active', estimate: '3w' },
		{ id: 'task-2', content: '2 - Watch my favorite show', status: 'Started', estimate: '1d' },
		{ id: 'task-3', content: '3 - Charge my phone', status: 'Hold', estimate: '2.5h' },
		{ id: 'task-4', content: '4 - Cook dinner', status: 'Finished', estimate: '2w 1d' }
	]
	// columns: {
	// 	'column-1': {
	// 		id: 'column-1',
	// 		title: 'To do',
	// 		taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
	// 	}
	// },
	// Facilitate reordering of the columns
	// columnOrder: ['column-1']
};

export default initialData;
