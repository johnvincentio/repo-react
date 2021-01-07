
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { DraggableContainer, DraggableHandle, DraggableItem } from './Styles';

export default class TabularItem extends React.Component {

	render() {
		const { headers, row, index } = this.props;
		return (
			<Draggable draggableId={row.id} index={index}>
				{(provided, snapshot) => {
					// console.log('TabularItem; provided ', provided, 'snapshot ', snapshot);
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
									<DraggableItem key={`item-${header.id}-${row.id}`} width={header.width}>
										{row[header.field]}
									</DraggableItem>
								);
							})}
						</DraggableContainer>
					);}}
			</Draggable>
		);
	}
}
