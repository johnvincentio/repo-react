
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import Container from './Container';
import MovableItem from './MovableItem';

import { columns } from './columns';

import './app.scss';

const App = () => {
	const [items, setItems] = useState(columns);
	const isMobile = window.innerWidth < 600;

	const handleMoveList = (fromIndex, toIndex, list) => {
		const before = toIndex < fromIndex;
		const newList = [];
		list.forEach((item, idx) => {
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
		return newList;
	};

	const moveCardHandler = (dragIndex, hoverIndex) => {
		console.log('App::moveCardHandler; dragIndex ', dragIndex, ' hoverIndex ', hoverIndex);
		const dragItem = items[dragIndex];
		console.log('App::moveCardHandler;dragItem ', dragItem);

		if (dragItem) {
			setItems((prevState => {
				const coppiedStateArray = [...prevState];
				console.log('App::moveCardHandler::setItems; prevState (before) ', prevState);

				// remove item by "hoverIndex" and put "dragItem" instead
				const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

				// remove item by "dragIndex" and put "prevItem" instead
				coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
				console.log('App::moveCardHandler::setItems; coppiedStateArray (after) ', coppiedStateArray);

				return coppiedStateArray;
			}));
		}
	};

	const dropHandler = (obj) => {
		console.log('App::dropHandler; obj ', obj);
		const { from, to } = obj;
		const list = handleMoveList(from, to, items);
		console.log(' items ', items, ' list ', list);
		setItems(list);
	};

	const returnItemsForContainer = () => items.map((item, index) => (
		<MovableItem
			key={item.id}
			id={item.id}
			name={item.name}
			setItems={setItems}
			index={index}
			moveCardHandler={moveCardHandler}
			dropHandler={dropHandler}
		/>
	));

	return (
		<div>
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				<Container title='outer' className='container'>
					{returnItemsForContainer()}
				</Container>
			</DndProvider>
		</div>
	);
};

export default App;

/*
	moveTask(from, to, before, tasks) {
		if (! tasks) throw Error('Exception in tasksService::moveTask');

		const list = JSON.parse(JSON.stringify(tasks));
		const move = tasks.find(item => item.taskid === from);

		const newList = [];
		list.forEach(item => {
			if (item.taskid !== from) {
				if (before && item.taskid === to) {
					newList.push(move);
				}
				newList.push(item);
				if (!before && item.taskid === to) {
					newList.push(move);
				}
			}
		});
		return newList;
	},
*/
