
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { DraggableContainer, DraggableHandle } from './Styles';


const Item = styled.div`
border: 1px solid lightblue;
border-radius: 2px;
width: ${props => props.width}px;
margin-left: 4px;
`;

export default class DraggableItem extends React.Component {

	render() {
		const { headers, row, index } = this.props;
		return (
			<Draggable draggableId={row.id} index={index}>
				{(provided, snapshot) => {
					// console.log('DraggableItem; provided ', provided, 'snapshot ', snapshot);
					const nothing = '';
					return (
						<DraggableContainer
							ref={provided.innerRef}
							{...provided.draggableProps}
							isDragging={snapshot.isDragging}
						>
							<DraggableHandle
								{...provided.dragHandleProps}
							/>
							{headers.map(header => {
								const nothing = '';
								// console.log('header ', header);
								return (
									<Item key={`item-${header.id}-${row.id}`} width={header.width}>
										{row[header.field]}
									</Item>
								);
							})}
						</DraggableContainer>
					);}}
			</Draggable>
		);
	}
}
