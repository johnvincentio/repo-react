
import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import styled from 'styled-components';

import Header from './Header';
import Column from './Column';

import initialData from './initial-data';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid green;
`;

const Item = styled.div`
border: 1px solid lightblue;
border-radius: 2px;
width: ${props => props.width};
`;

const DataHeaders = {
	content: { width: '200px', title: 'Task' },
	status: { width: '100px', title: 'Status' },
	estimate: { width: '80px', title: 'Estimate' }
};

class App extends React.Component {
	state = initialData;

	onDragStart = start => {
		console.log('App::onDragStart; start ', start);
		document.body.style.color = 'orange';
		document.body.style.transition = 'background-color 0.2s ease';
	}

	onDragUpdate = update => {
		console.log('App::onDragUpdate; update ', update);
		const { destination } = update;
		const opacity = destination
			? destination.index /Object.keys(this.state.tasks).length
			: 0;
		document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
	}

	onDragEnd = result => {
		console.log('App::onDragEnd; result ', result);
		document.body.style.color = 'inherit';
		document.body.style.backgroundColor = 'inherit';
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const column = this.state.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
			taskIds: newTaskIds
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newColumn.id]: newColumn
			}
		};
		console.log('newState ', newState);

		this.setState(newState);
	};

	render() {
		return (
			<DragDropContext
				onDragEnd = {this.onDragEnd}
				onDragStart = {this.onDragStart}
				onDragUpdate = {this.onDragUpdate}
			>
				<Container>
					<Header info={DataHeaders} />

					{this.state.columnOrder.map((columnId) => {
						const column = this.state.columns[columnId];
						const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

						return <Column key={column.id} column={column} tasks={tasks} />;
					})}
				</Container>
			</DragDropContext>
		);
	}
}

export default App;
