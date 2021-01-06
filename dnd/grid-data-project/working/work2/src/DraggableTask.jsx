
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
	background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')};
	display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export default class DraggableTask extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{(provided, snapshot) => {
					console.log('Task; provided ', provided, 'snapshot ', snapshot);
					return (
						<Container
							ref={provided.innerRef}
							{...provided.draggableProps}
							// {...provided.dragHandleProps}
							isDragging={snapshot.isDragging}
						>
							<Handle
								{...provided.dragHandleProps}
							/>
							<Task task={this.props.task} />
						</Container>
					);}}
			</Draggable>
		);
	}
}
