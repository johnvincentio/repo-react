
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const MovableItem = ({ name, index, moveCardHandler, setItems }) => {

	// const changeItemColumn = (currentItem, columnName) => {
	// 	console.log('MovableItem::changeItemColumn; currentItem ', currentItem, ' columnName ', columnName);
	// 	setItems((prevState) => prevState.map(e => ({
	// 		...e,
	// 		column: e.name === currentItem.name ? columnName : e.column
	// 	})));
	// };

	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: 'column_type',
		hover(item, monitor) {
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
	});

	const [{ isDragging }, drag] = useDrag({
		item: { index, name, type: 'column_type' },
		end: (item, monitor) => {
			console.log('MovableItem::useDrag::end; item ', item, ' monitor ', monitor);
			const dropResult = monitor.getDropResult();
			console.log('MovableItem::useDrag; dropResult ', dropResult);

			// changeItemColumn(item);

			// if (dropResult) {
			// 	const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
			// 	switch (dropResult.name) {
			// 		case IN_PROGRESS:
			// 			changeItemColumn(item, IN_PROGRESS);
			// 			break;
			// 		case AWAITING_REVIEW:
			// 			changeItemColumn(item, AWAITING_REVIEW);
			// 			break;
			// 		case DONE:
			// 			changeItemColumn(item, DONE);
			// 			break;
			// 		case DO_IT:
			// 			changeItemColumn(item, DO_IT);
			// 			break;
			// 		default:
			// 			break;
			// 	}
			// }
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	const opacity = isDragging ? 0.4 : 1;

	drag(drop(ref));

	return (
		<div ref={ref} className='movable-item' style={{ opacity }}>
			{name}
		</div>
	);
};

export default MovableItem;
