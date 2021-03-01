
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

	const dropHandler = (item) => {
		console.log('App::dropHandler; item ', item);
	};

	const returnItemsForContainer = () => items.map((item, index) => (
		<MovableItem
			key={item.id}
			id={item.id}
			name={item.name}
			setItems={setItems}
			index={index}
			moveCardHandler={moveCardHandler}
		/>
	));

	return (
		<div>
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				<Container title='outer' className='container' dropHandler={dropHandler}>
					{returnItemsForContainer()}
				</Container>
			</DndProvider>
		</div>
	);
};

export default App;
