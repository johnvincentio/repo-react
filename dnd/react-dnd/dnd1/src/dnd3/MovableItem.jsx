
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const MovableItem = ({ id, name, index, moveCardHandler, setItems, dropHandler }) => {

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
		item: { id, index, name, type: 'column_type' },
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

/*
		hoverJV(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// Time to actually perform the action
			moveCardHandler(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		}
*/
