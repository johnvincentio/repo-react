
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import styled from 'styled-components';

import Column from './Column';

import initialData from './initial-data';

const Container = styled.div`
	display: flex;
`;

class App extends React.Component {
	state = initialData;

	onDragStart = start => {
		console.log('App::onDragStart; start ', start);
		// document.body.style.color = 'orange';
		// document.body.style.transition = 'background-color 0.2s ease';
		// const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
		// this.setState({ homeIndex });
	}

	onDragUpdate = update => {
		console.log('App::onDragUpdate; update ', update);
		// const { destination } = update;
		// const opacity = destination
		// 	? destination.index /Object.keys(this.state.tasks).length
		// 	: 0;
		// document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
	}

	onDragEnd = result => {
		// this.setState({ homeIndex: null });
		// document.body.style.color = 'inherit';
		// document.body.style.backgroundColor = 'inherit';

		const { destination, source, draggableId, type } = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(this.state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...this.state,
				columnOrder: newColumnOrder
			};
			this.setState(newState);
			return;
		}

		const home = this.state.columns[source.droppableId];
		// console.log('home ', home);
		const foreign = this.state.columns[destination.droppableId];
		// console.log('foreign ', foreign);

		if (home === foreign) {
			const newTaskIds = Array.from(home.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newHome = {
				...home,
				taskIds: newTaskIds
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newHome.id]: newHome
				}
			};

			this.setState(newState);
			return;
		}

		// Moving from one list to another
		const homeTaskIds = Array.from(home.taskIds);
		homeTaskIds.splice(source.index, 1);
		const newHome = {
			...home,
			taskIds: homeTaskIds
		};

		const foreignTaskIds = Array.from(foreign.taskIds);
		foreignTaskIds.splice(destination.index, 0, draggableId);
		const newForeign = {
			...foreign,
			taskIds: foreignTaskIds
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newHome.id]: newHome,
				[newForeign.id]: newForeign
			}
		};
		this.setState(newState);
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId='all-columns' direction='horizontal' type='column'>
					{(provided) => (
						<Container
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{this.state.columnOrder.map((columnId, index) => {
								// console.log('App: columnOrder.map, columnId ', columnId, ' index ', index);
								const column = this.state.columns[columnId];
								// console.log('column ', column);
								const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
								return <Column key={column.id} column={column} tasks={tasks} index={index} />;
							})}
							{provided.placeholder}
						</Container>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default App;
