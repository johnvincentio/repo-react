
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';

import { ITEM_TYPE } from './constants';

const MovableItem = ({ indexList, name, indexItem, dropItemHandler }) => {

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
			console.log('indexList ', indexList, ' indexItem ', indexItem, ' abc ', abc);
			dropItemHandler({
				from: { column: abc.indexList, item: abc.indexItem },
				to: { column: indexList, item: indexItem }
			});
		}
		// canDrop: (item) => true
	});

	const [{ isDragging }, dragRef] = useDrag({
		item: { indexList, indexItem, name, type: ITEM_TYPE },
		end: (item, monitor) => {
			console.log('MovableItem::useDrag::end; item ', item, ' monitor ', monitor);
			const dropResult = monitor.getDropResult();
			console.log('MovableItem::useDrag; dropResult ', dropResult);
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	const getBackgroundColor = () => {
		if (isOver) {
			if (canDrop) {
				return 'rgb(188,251,255)';
			}
			return 'rgb(255,188,188)';
		}
		return '';
	};

	const opacity = isDragging ? 0.4 : 1;

	dragRef(dropRef(ref));

	return (
		<div ref={ref} className='movable-item' style={{ opacity, backgroundColor: getBackgroundColor() }}>
			{name}
		</div>
	);
};

MovableItem.propTypes = {
	indexList: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	indexItem: PropTypes.number.isRequired,
	dropItemHandler: PropTypes.func.isRequired
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
