
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';

import { ITEM_TYPE } from './constants';

const MovableItem = ({ name, index }) => {

	const ref = useRef(null);

	const [{ isOver, canDrop }, dropRef] = useDrop({
		accept: ITEM_TYPE,
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: monitor.canDrop()
		}),
		drop: (item, monitor) => {
			console.log('MovableItem::drop; item ', item, ' monitor ', monitor);
			const abc = monitor.getItem();
			console.log('abc ', abc);
			// dropHandler({ from: abc.index, to: index });
		}
		// canDrop: (item) => true
	});

	const [{ isDragging }, dragRef] = useDrag({
		item: { index, name, type: ITEM_TYPE },
		end: (item, monitor) => {
			console.log('MovableItem::useDrag::end; item ', item, ' monitor ', monitor);
			const dropResult = monitor.getDropResult();
			console.log('MovableItem::useDrag; dropResult ', dropResult);
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	const getBackgroundColor = () => 'rgb(188,251,255)';

	const opacity = 1;

	// dragRef(ref);
	dragRef(dropRef(ref));

	return (
		<div ref={ref} className='movable-item' style={{ opacity, backgroundColor: getBackgroundColor() }}>
			{name}
		</div>
	);
};

MovableItem.propTypes = {
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

export default MovableItem;

/*
		if (isOver) {
			if (canDrop) {
				return 'rgb(188,251,255)';
			}
			return 'rgb(255,188,188)';
		}
		return '';
*/
