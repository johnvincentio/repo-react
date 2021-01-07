
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
	margin: 5px;
`;

const Item = styled.div`
border: 1px solid lightblue;
border-radius: 2px;
width: ${props => props.width};
`;

class App extends React.Component {
	state = initialData;

	onDragStart = start => {
		console.log('App::onDragStart; start ', start);
		const { type } = start;
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

		const { tasks } = this.state;
		const fromIndex = source.index;
		const toIndex = destination.index;
		console.log('fromIndex ', fromIndex);
		console.log('toIndex ', toIndex);

		const before = toIndex < fromIndex;
		const newTasks = [];
		tasks.forEach((task, idx) => {
			if (idx !== fromIndex) {
				if (before && idx === toIndex) {
					newTasks.push(tasks[fromIndex]);
				}
				newTasks.push(tasks[idx]);
				if (!before && idx === toIndex) {
					newTasks.push(tasks[fromIndex]);
				}
			}
		});
		console.log('newTasks ', newTasks);

		const newState = { ...this.state, tasks: newTasks };
		console.log('newState ', newState);
		this.setState(newState);
	};

	render() {
		return (
			<Container>
				<Header header={this.state.headers} onUpdate={this.updateHeader} />
				<Column tasks={this.state.tasks} onUpdate={this.updateTasks}  />
			</Container>
		);
	}
}

export default App;
