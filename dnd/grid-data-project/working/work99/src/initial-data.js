
const initialData = {
	list: [
		{ id: 'list-1', content: '1 - Take out the garbage', status: 'Active', estimate: '3w', a: 'a1', b: 'b1', c: 'c1' },
		{ id: 'list-2', content: '2 - Watch show', status: 'Started', estimate: '1d', a: 'a2', b: 'b2', c: 'c1' },
		{ id: 'list-3', content: '3 - Charge my phone', status: 'Hold', estimate: '2.5h', a: 'a3', b: 'b3', c: 'c3' },
		{ id: 'list-4', content: '4 - Cook dinner', status: 'Finished', estimate: '2w 1d', a: 'a4', b: 'b4', c: 'c4' }
	],
	headers: [
		{ id: 20, width: '200px', title: 'Task', field: 'content' },
		{ id: 17, width: '100px', title: 'Status', field: 'status' },
		{ id: 28, width: '80px', title: 'Estimate', field: 'estimate' },
		{ id: 11, width: '80px', title: 'A', field: 'a' },
		{ id: 4, width: '80px', title: 'B', field: 'b' },
		{ id: 8, width: '80px', title: 'C', field: 'c' }
	]
};

export default initialData;

// headersOrder: [20, 17, 28, 11, 4, 8]
// columns: {
// 	'column-1': {
// 		id: 'column-1',
// 		title: 'To do',
// 		taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
// 	}
// },
// Facilitate reordering of the columns
// columnOrder: ['column-1']
