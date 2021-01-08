
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Resizable } from 're-resizable';

import { HeaderContainer, HeaderSpacerItem, HeaderItem } from './Styles';

export default class TabularHeader extends React.Component {

	onDragStart = start => {
		console.log('TabularHeader::onDragStart; start ', start);
		const { type } = start;
		document.body.style.color = 'orange';
		document.body.style.transition = 'background-color 0.2s ease';
	}

	onDragUpdate = update => {
		console.log('TabularHeader::onDragUpdate; update ', update);
		// const { destination } = update;
		// const opacity = destination
		// 	? destination.index /Object.keys(this.props.list).length
		// 	: 0;
		// document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
	}

	onDragEnd = result => {
		console.log('TabularHeader::onDragEnd; result ', result);
		document.body.style.color = 'inherit';
		document.body.style.backgroundColor = 'inherit';
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const { list } = this.props;
		const fromIndex = source.index;
		const toIndex = destination.index;
		console.log('fromIndex ', fromIndex);
		console.log('toIndex ', toIndex);

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
		console.log('newList ', newList);
		this.props.onHeaderUpdate(newList);
	}

	updateColumnWidth = (delta, index) => {
		this.props.onWidthUpdate(delta, index);
	};

	render() {
		const { list } = this.props;
		console.log('TabularHeader::render(); list ', list);
		return (
			<DragDropContext
				onDragEnd = {this.onDragEnd}
				onDragStart = {this.onDragStart}
				onDragUpdate = {this.onDragUpdate}
			>
				<Droppable droppableId='header-droppable' direction='horizontal' type='header'>
					{(provided, snapshot) => {
						const nothing = '';
						// console.log('Header; provided ', provided, ' snapshot ', snapshot);
						return (
							<HeaderContainer
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								<HeaderSpacerItem key='header-0' />

								{list.map((item, idx) => {
									// console.log('next ', next);
									const nothing = '';
									// const item = list.find(item => item.id === next);
									// console.log('item ', item);
									return (
										<Draggable
											key={`header-${item.id}`}
											draggableId={`${item.title}-${item.id}`}
											index={idx}
										>
											{(provided, snapshot) => {
												const sizer = {
													marginLeft: '4px',
													padding: '0px 8px 0px 8px',
													borderLeft: idx === 0 ? 'solid 1px rgb(232, 232, 232)' : 'none',
													borderRight: 'solid 1px rgb(232, 232, 232)'
												};
												const enable = {
													top: false,
													right: true,
													bottom: false,
													left: idx === 0,
													topRight: false,
													bottomRight: false,
													bottomLeft: false,
													topLeft: false
												};
												console.log('idx ', idx, ' enable ', enable);
												console.log('Header; provided ', provided, ' snapshot ', snapshot);
												return (
													<Resizable
														defaultSize={{ width: item.width, height: '100%' }}
														onResizeStart={e => e.stopPropagation()}
														onResizeStop={(e, d, ref, delta) =>
															this.updateColumnWidth(delta, idx)
														}
														enable={enable}
														style={sizer}
  		 										>
														<HeaderItem
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															isDragging={snapshot.isDragging}
														>
															{item.title}
														</HeaderItem>
													</Resizable>
												);
											}}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</HeaderContainer>
						);
					}}
				</Droppable>
			</DragDropContext>
		);
	}
}

/*
style={{
	padding: '0px 8px 0px 8px',
	borderLeft: 'solid 1px rgb(232, 232, 232)',
	borderRight: 'solid 1px rgb(232, 232, 232)'
}}
// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: blue;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
// 	background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')};
// 	display: flex;
// `;

/*
<div
	key={`zzz-header-${item.id}`}
	ref={provided.innerRef}
	{...provided.draggableProps}
	{...provided.dragHandleProps}
	isDragging={snapshot.isDragging}
>
	<Item key={`header-${item.id}`} width={item.width}>
		{item.title}
	</Item>
</div>

<Draggable draggableId={this.props.task.id} index={this.props.index}>
	{(provided, snapshot) => {
		console.log('Task; provided ', provided, 'snapshot ', snapshot);
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
					{this.props.task.content}
				</Item>
				<Item width={obj.status}>
					{this.props.task.status}
				</Item>
				<Item width={obj.estimate}>
					{this.props.task.estimate}
				</Item>
			</Container>
		);}}
</Draggable>
*/
/*
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
*/
/*
<Item width={info.content.width}>
	{info.content.title}
</Item>
<Item width={info.status.width}>
	{info.status.title}
</Item>
<Item width={info.estimate.width}>
	{info.estimate.title}
</Item>
*/
