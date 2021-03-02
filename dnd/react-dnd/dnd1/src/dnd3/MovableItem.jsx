
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const MovableItem = ({ name, index, dropHandler }) => {

	const ref = useRef(null);

	const [{ isOver, canDrop }, dropRef] = useDrop({
		accept: 'column_type',
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: monitor.canDrop()
		}),
		drop: (item, monitor) => {
			console.log('MovableItem::drop; item ', item, ' monitor ', monitor);
			const abc = monitor.getItem();
			console.log('abc ', abc);
			dropHandler({ from: abc.index, to: index });
		}
		// canDrop: (item) => true
	});

	const [{ isDragging }, dragRef] = useDrag({
		item: { index, name, type: 'column_type' },
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
	// const back = isOver ? '#bbf' : 'rgba(0,0,0,.12';

	dragRef(dropRef(ref));

	return (
		<div ref={ref} className='movable-item' style={{ opacity, backgroundColor: getBackgroundColor() }}>
			{name}
		</div>
	);
};

export default MovableItem;
