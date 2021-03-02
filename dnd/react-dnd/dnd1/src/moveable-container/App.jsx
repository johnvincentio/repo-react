
import React, { useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import MovableList from './MovableList';
import MovableItem from './MovableItem';

import { handleMoveList, handleMoveItemWithinList, handleMoveItemToList } from './utils';

import { initialData } from './initial-data';

import './app.scss';

const App = () => {
	const [data, setData] = useState(initialData);
	const isMobile = window.innerWidth < 600;

	const dropListHandler = (obj) => {
		// console.log('App::dropListHandler; obj ', obj);
		const { from, to } = obj;
		if (from === to) return;
		const list = handleMoveList(from, to, data);
		// console.log(' data ', data, ' list ', list);
		setData(list);
	};

	const dropItemHandler = obj => {
		// console.log('App::dropItemHandler; obj ', obj);
		const { from, to } = obj;
		if (from.column === to.column) {
			if (from.item === to.item) return;
			// console.log('data ', data);
			const list = handleMoveItemWithinList(from.column, from.item, to.item, data);
			// console.log('data ', data, ' list ', list);
			setData(list);
		}
		else {
			// console.log('data ', data);
			const list = handleMoveItemToList(from.column, from.item, to.column, to.item, data);
			// console.log('data ', data, ' list ', list);
			setData(list);
		}
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
