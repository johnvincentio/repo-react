import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table } from 'antd';
import Resizable from 're-resizable';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name'
	},
	{
		title: 'Age',
		dataIndex: 'age',
		width: 100
	},
	{
		title: 'Address',
		dataIndex: 'address',
		width: 200
	},
	{
		title: 'Status',
		dataIndex: 'status',
		width: 100
	}
];
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		status: 'pending'
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		status: 'in progress'
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		status: 'pending'
	}
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getItemStyle = (isDragging, draggableStyle, item) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: item.dataIndex !== 'name' ? 0 : 8,
	// width: item.id !== 'name' ? columnsHashmap[item.id].width : undefined,

	// change background colour if dragging
	background: isDragging ? 'rgb(232, 232, 232)' : 'transparent',
	flex: item.dataIndex === 'name' ? 1 : undefined,
	fontWeight: 500,
	color: 'rgba(0, 0, 0, 0.85)',

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	// background: isDraggingOver ? "lightblue" : "white",
	display: 'flex',
	padding: 8,
	overflow: 'auto'
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: columns
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			this.state.items,
			result.source.index,
			result.destination.index
		);

		this.setState({
			items
		});
	}

  updateColumnWidth = (delta, index) => {
  	const items = Array.from(this.state.items);
  	items[index].width += delta.width;

  	this.setState({ items });
  };

  getItem = (provided, snapshot, item, index) => item.dataIndex === 'name' ? (
  	<div
  		ref={provided.innerRef}
  		{...provided.draggableProps}
  		{...provided.dragHandleProps}
  		style={getItemStyle(
  			snapshot.isDragging,
  			provided.draggableProps.style,
  			item
  		)}
  	>
  		{item.title}
  	</div>
  ) : (
  	<div
  		ref={provided.innerRef}
  		{...provided.draggableProps}
  		{...provided.dragHandleProps}
  		style={getItemStyle(
  			snapshot.isDragging,
  			provided.draggableProps.style,
  			item
  		)}
  	>
  		<Resizable
  			defaultSize={{ width: item.width, height: '100%' }}
  			onResizeStart={e => e.stopPropagation()}
  			onResizeStop={(e, d, ref, delta) =>
  				this.updateColumnWidth(delta, index)
  			}
  			enable={{
  				top: false,
  				right: false,
  				bottom: false,
  				left: true,
  				topRight: false,
  				bottomRight: false,
  				bottomLeft: false,
  				topLeft: false
  			}}
  			style={{
  				padding: '8px 8px 8px 4px',
  				borderLeft: 'solid 1px rgb(232, 232, 232)'
  			}}
  		>
  			{item.title}
  		</Resizable>
  	</div>
  );

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
  	return (
  		<>
  			<DragDropContext onDragEnd={this.onDragEnd}>
  				<Droppable droppableId='droppable' direction='horizontal'>
  					{(provided, snapshot) => (
  						<div
  							ref={provided.innerRef}
  							style={getListStyle(snapshot.isDraggingOver)}
  							{...provided.droppableProps}
  						>
  							{this.state.items.map((item, index) => (
  								<Draggable
  									key={item.dataIndex}
  									draggableId={item.dataIndex}
  									index={index}
  								>
  									{(provided, snapshot) =>
  										this.getItem(provided, snapshot, item, index)
  									}
  								</Draggable>
  							))}
  							{provided.placeholder}
  						</div>
  					)}
  				</Droppable>
  			</DragDropContext>
  			<Table
  				showHeader={false}
  				pagination={false}
  				columns={this.state.items}
  				dataSource={data}
  				size='small'
  			/>
  		</>
  	);
  }
}

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));
