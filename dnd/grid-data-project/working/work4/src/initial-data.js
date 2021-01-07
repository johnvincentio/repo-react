
const initialData = {
	list: [
		{ id: 'list-1', content: '1 - Take out the garbage', status: 'Active', estimate: '3w' },
		{ id: 'list-2', content: '2 - Watch my favorite show', status: 'Started', estimate: '1d' },
		{ id: 'list-3', content: '3 - Charge my phone', status: 'Hold', estimate: '2.5h' },
		{ id: 'list-4', content: '4 - Cook dinner', status: 'Finished', estimate: '2w 1d' }
	],
	headers: [
		{ id: 0, width: '200px', title: 'Task' },
		{ id: 1, width: '100px', title: 'Status' },
		{ id: 2, width: '80px', title: 'Estimate' }
	]
};

export default initialData;

// columns: {
// 	'column-1': {
// 		id: 'column-1',
// 		title: 'To do',
// 		taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
// 	}
// },
// Facilitate reordering of the columns
// columnOrder: ['column-1']
