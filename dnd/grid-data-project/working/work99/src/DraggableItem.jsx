
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
	// padding: 8px;
	// margin-top: 6px;
	padding: 6px 0;
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

const Item = styled.div`
border: 1px solid lightblue;
border-radius: 2px;
width: ${props => props.width};
`;

const obj = {
	content: '200px',
	status: '100px',
	estimate: '80px'
};

export default class DraggableItem extends React.Component {

	render() {
		const { headers, row, index } = this.props;
		return (
			<Draggable draggableId={row.id} index={index}>
				{(provided, snapshot) => {
					console.log('DraggableItem; provided ', provided, 'snapshot ', snapshot);
					return (
						<Container
							ref={provided.innerRef}
							{...provided.draggableProps}
							isDragging={snapshot.isDragging}
						>
							<Handle
								{...provided.dragHandleProps}
							/>
							<Item width={obj.content}>
								{row.content}
							</Item>
							<Item width={obj.status}>
								{row.status}
							</Item>
							<Item width={obj.estimate}>
								{row.estimate}
							</Item>
						</Container>
					);}}
			</Draggable>
		);
	}
}
