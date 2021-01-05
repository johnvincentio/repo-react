
import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import Column from './Column';

import initialData from './initial-data';

class App extends React.Component {
	state = initialData;

	onDragEnd = result => {

	}

	// onDragStart, onDragUpdate
	render() {
		return (
			<DragDropContext onDragEnd = {this.onDragEnd}>
				{this.state.columnOrder.map((columnId) => {
					const column = this.state.columns[columnId];
					const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
			</DragDropContext>
		);
	}
}

export default App;
