
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const MovableItem = ({ name, index, dropHandler }) => {

	const ref = useRef(null);

	const [{ isOver }, drop] = useDrop({
		accept: 'column_type',
		collect: (monitor) => ({
			isOver: !!monitor.isOver()
		}),
		drop: (item, monitor) => {
			console.log('MovableItem::drop; item ', item, ' monitor ', monitor);
			const abc = monitor.getItem();
			console.log('abc ', abc);
			dropHandler({ from: abc.index, to: index });
		}
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

	const opacity = isDragging ? 0.4 : 1;
	const back = isOver ? '#bbf' : 'rgba(0,0,0,.12';

	dragRef(drop(ref));

	return (
		<div ref={ref} className='movable-item' style={{ opacity, backgroundColor: back }}>
			{name}
		</div>
	);
};

export default MovableItem;
