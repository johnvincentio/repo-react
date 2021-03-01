
import React from 'react';
import { useDrop } from 'react-dnd';

const Column = ({ children, className, title }) => {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: 'column_type',
		drop: () => ({ name: title }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		}),
		// Override monitor.canDrop() function
		canDrop: (item) =>
			// console.log('Column::canDrop; item ', item);
			 true

	});

	const getBackgroundColor = () => {
		if (isOver) {
			if (canDrop) {
				return 'rgb(188,251,255)';
			} if (!canDrop) {
				return 'rgb(255,188,188)';
			}
		}
		return '';
	};

	return (
		<div ref={drop} className={className} style={{ backgroundColor: getBackgroundColor() }}>
			<p>{title}</p>
			{children}
		</div>
	);
};

export default Column;
