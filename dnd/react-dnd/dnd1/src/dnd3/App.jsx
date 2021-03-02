
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

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
			name={item.name}
			index={index}
			dropHandler={dropHandler}
		/>
	));

	return (
		<div>
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				<div className='container'>
					<p>Outer</p>
					{returnItemsForContainer()}
				</div>
			</DndProvider>
		</div>
	);
};

export default App;
