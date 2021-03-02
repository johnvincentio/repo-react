
import React, { useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import MovableList from './MovableList';
import MovableItem from './MovableItem';

import { handleMoveList } from './utils';

import { initialData } from './initial-data';

import './app.scss';

const App = () => {
	const [data, setData] = useState(initialData);
	const isMobile = window.innerWidth < 600;

	const dropListHandler = (obj) => {
		console.log('App::dropListHandler; obj ', obj);
		const { from, to } = obj;
		const list = handleMoveList(from, to, data);
		console.log(' data ', data, ' list ', list);
		setData(list);
	};

	const dropItemHandler = obj => {
		console.log('App::dropItemHandler; obj ', obj);
		const { from, to } = obj;
	};

	return (
		<div>
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				<div className='container-list'>
					{data.map((column, idx1) => (
						<MovableList
							key={`column-${column.id}`}
							name={column.name}
							index={idx1}
							dropListHandler={dropListHandler}
						>
							<div className='container-item'>
								{column.list.map((task, idx2) => (
									<MovableItem
										key={`item-${task.id}`}
										indexList={idx1}
										name={task.name}
										indexItem={idx2}
										dropItemHandler={dropItemHandler}
									/>
								))}
							</div>
						</MovableList>
					))}
				</div>
			</DndProvider>
		</div>
	);
};

export default App;

/*
	const moveTaskToContainer = (fromColumnid, toColumnid, fromIndex, toIndex) => {
		// console.log('MultipleMoveable::moveTaskToContainer; fromColumnid ', fromColumnid,
		// ' toColumnid ', toColumnid, ' fromIndex ', fromIndex, ' toIndex ', toIndex);
		const { datatype, subtype } = dataObject;
		const newObject = { ...dataObject };
		const fromColumnItem = newObject.data.find(item => item.columnid === fromColumnid);
		// console.log('fromColumnItem ', fromColumnItem);
		const toColumnItem = newObject.data.find(item => item.columnid === toColumnid);
		// console.log('toColumnItem ', toColumnItem);

		const fromMoveId = fromColumnItem.list[fromIndex].id;
		const toMoveId = toColumnItem.list[toIndex].id;
		const containerId = toColumnItem.columnid;

		const update = utilities.handleMoveColumn(fromIndex, toIndex, fromColumnItem.list, toColumnItem.list);
		// console.log('update ', update);
		fromColumnItem.list = update.from;
		toColumnItem.list = update.to;
		// console.log('newObject ', newObject);
		setDataObject(newObject);
*/
