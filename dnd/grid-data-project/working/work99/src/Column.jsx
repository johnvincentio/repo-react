/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import DraggableTask from './DraggableTask';

const Container = styled.div`
  margin: 8px;
  border: 1px solid brown;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

export default class Column extends React.Component {
	render() {
		return (
			<Container>
				{/* <Title>{this.props.column.title}</Title> */}
				<Droppable droppableId={this.props.column.id}>
					{(provided, snapshot) => {
						console.log('Column; provided ', provided, ' snapshot ', snapshot);
						return (
							<TaskList
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								{this.props.tasks.map((task, index) => (
									<DraggableTask key={task.id} task={task} index={index} />
								))}
								{provided.placeholder}
							</TaskList>
						);}}
				</Droppable>
			</Container>
		);
	}
}
