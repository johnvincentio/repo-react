/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TabularItem from './TabularItem';

import { TabularListDropContainer } from './Styles';

export default class TabularList extends React.Component {

	onDragStart = start => {
		// console.log('TabularList::onDragStart; start ', start);
		const { type } = start;
		document.body.style.color = 'orange';
		document.body.style.transition = 'background-color 0.2s ease';
	}

	onDragUpdate = update => {
		// console.log('TabularList::onDragUpdate; update ', update);
		const { destination } = update;
		const opacity = destination
			? destination.index /Object.keys(this.props.list).length
			: 0;
		document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
	}

	onDragEnd = result => {
		// console.log('TabularList::onDragEnd; result ', result);
		document.body.style.color = 'inherit';
		document.body.style.backgroundColor = 'inherit';
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const { list, onUpdate } = this.props;
		const fromIndex = source.index;
		const toIndex = destination.index;
		// console.log('fromIndex ', fromIndex);
		// console.log('toIndex ', toIndex);

		const before = toIndex < fromIndex;
		const newList = [];
		list.forEach((task, idx) => {
			if (idx !== fromIndex) {
				if (before && idx === toIndex) {
					newList.push(list[fromIndex]);
				}
				newList.push(list[idx]);
				if (!before && idx === toIndex) {
					newList.push(list[fromIndex]);
				}
			}
		});
		// console.log('newList ', newList);
		onUpdate(newList);
	};

	render() {
		const { list, headers } = this.props;
		// console.log('TabularList::render(); list ', list);
		return (
			<DragDropContext
				onDragEnd = {this.onDragEnd}
				onDragStart = {this.onDragStart}
				onDragUpdate = {this.onDragUpdate}
			>
				<Droppable droppableId='tabular-list-droppable' type='list'>
					{(provided, snapshot) => {
						const nothing = '';
						// console.log('TabularList; provided ', provided, ' snapshot ', snapshot);
						return (
							<TabularListDropContainer
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								{list.map((row, index) => (
									<TabularItem key={row.id} headers={headers} row={row} index={index} />
								))}
								{provided.placeholder}
							</TabularListDropContainer>
						);
					}}
				</Droppable>
			</DragDropContext>
		);
	}
}
