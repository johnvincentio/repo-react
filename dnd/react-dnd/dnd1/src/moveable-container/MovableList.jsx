
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';

import { LIST_TYPE } from './constants';

const MovableList = ({ children, name, index, dropHandler }) => {

	const ref = useRef(null);

	const [{ isOver, canDrop }, dropRef] = useDrop({
		accept: LIST_TYPE,
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: monitor.canDrop()
		}),
		drop: (item, monitor) => {
			console.log('MovableList::drop; item ', item, ' monitor ', monitor);
			const abc = monitor.getItem();
			console.log('index ', index, ' abc ', abc);
			dropHandler({ from: abc.index, to: index });
		}
		// canDrop: (item) => true
	});

	const [{ isDragging }, dragRef] = useDrag({
		item: { index, name, type: LIST_TYPE },
		end: (item, monitor) => {
			console.log('MovableList::useDrag::end; item ', item, ' monitor ', monitor);
			const dropResult = monitor.getDropResult();
			console.log('MovableList::useDrag; dropResult ', dropResult);
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
		<div ref={ref} className='movable-list' style={{ opacity, backgroundColor: getBackgroundColor() }}>
			{name}
			{children}
		</div>
	);
};

MovableList.propTypes = {
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	dropHandler: PropTypes.func.isRequired
};

export default MovableList;
