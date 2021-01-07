

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import styled from 'styled-components';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
// 	background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')};
// 	display: flex;
// `;

const Container = styled.div`
  margin: 8px;
  border: 1px solid brown;
	border-radius: 2px;
	display: flex;

	margin-bottom: 8px;
	padding: 8px;
`;

const Item = styled.div`
	border: 1px solid lightblue;
	border-radius: 2px;
	width: ${props => props.width};
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: blue;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

export default class Header extends React.Component {

	render() {
		const { header } = this.props;
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId='header-droppable' direction='horizontal' type='header'>
					{(provided, snapshot) => {
						console.log('Header; provided ', provided, ' snapshot ', snapshot);
						return (
							<Container
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								<Item key='header-0' width='20px'>A</Item>

								{header.map(item => {
									console.log('item ', item);
									return (
										<Draggable
											key={`header-${item.id}`}
											draggableId={`${item.title}-${item.id}`}
											index={item.id}
										>
											{(provided, snapshot) => {
												console.log('Header; provided ', provided, ' snapshot ', snapshot);
												return (
													<Item
														width={item.width}
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														isDragging={snapshot.isDragging}
													>
														{item.title}
													</Item>
												);
											}}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</Container>
						);
					}}
				</Droppable>
			</DragDropContext>
		);
	}
}
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
