
import React from 'react';
import { useDrop } from 'react-dnd';

const Container = ({ children, className, title, dropHandler }) =>
// const [{ isOver, canDrop }, dropRef] = useDrop({
// 	accept: 'column_type',
// 	// drop: () => ({ name: title }),
// 	drop: (item, monitor) => {
// 		console.log('Container::useDrop::drop; item ', item, ' monitor ', monitor);
// 		// return dropHandler(item);
// 		return { name: title };
// 	},
// 	collect: (monitor) => ({
// 		isOver: monitor.isOver(),
// 		canDrop: monitor.canDrop()
// 	}),
// 	// Override monitor.canDrop() function
// 	canDrop: (item) =>
// 		// console.log('Container::useDrop::canDrop; item ', item);
// 		 true
// });

// const getBackgroundColor = () => {
// 	if (isOver) {
// 		if (canDrop) {
// 			return 'rgb(188,251,255)';
// 		} if (!canDrop) {
// 			return 'rgb(255,188,188)';
// 		}
// 	}
// 	return '';
// };

	 (
		<div className={className}>
			<p>{title}</p>
			{children}
		</div>
	)
;

export default Container;

/*
	return (
		<div ref={dropRef} className={className} style={{ backgroundColor: getBackgroundColor() }}>
			<p>{title}</p>
			{children}
		</div>
	);
*/
