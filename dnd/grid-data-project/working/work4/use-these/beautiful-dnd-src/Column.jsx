/* eslint-disable max-classes-per-file */

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
  margin: 8px;
	border: 1px solid lightgrey;
	background-color: white;
	border-radius: 2px;
	width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
	flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {
	shouldComponentUpdate(nextProps) {
		if (nextProps.tasks === this.props.tasks) {
			return false;
		}
		return true;
	}

	render() {
		return this.props.tasks.map((task, index) => (
			<Task key={task.id} task={task} index={index} />
		));
	}
}

export default class Column extends React.Component {
	render() {
		return (
			<DragDropContext
				onDragEnd = {this.onDragEnd}
				onDragStart = {this.onDragStart}
				onDragUpdate = {this.onDragUpdate}
			>
				<Draggable draggableId={this.props.column.id} index={this.props.index}>
					{(provided) => (
						<Container
							{...provided.draggableProps}
							ref={provided.innerRef}
						>
							<Title {...provided.dragHandleProps}>
								{this.props.column.title}
							</Title>
							<Droppable
								droppableId={this.props.column.id}
								type='task'
							>
								{(provided, snapshot) => {
									console.log('Column; provided ', provided, ' snapshot ', snapshot);
									return (
										<TaskList
											ref={provided.innerRef}
											{...provided.droppableProps}
											isDraggingOver={snapshot.isDraggingOver}
										>
											<InnerList tasks={this.props.tasks} />
											{provided.placeholder}
										</TaskList>
									);
								}}
							</Droppable>
						</Container>
			        )}
				</Draggable>
			</DragDropContext>
		);
	}
}
