
export const handleMoveList = (fromIndex, toIndex, list) => {
	const before = toIndex < fromIndex;
	const newList = [];
	list.forEach((item, idx) => {
		if (idx !== fromIndex) {
			if (before && idx === toIndex) {
				newList.push(list[fromIndex]);
			}
			newList.push(list[idx]);
			if (!before && idx === toIndex) {
				newList.push(list[fromIndex]);
			}
		}
	});
	return newList;
};

export const handleMoveItemWithinList = (fromColumnIndex, fromIndex, toIndex, list) => {
	// console.log('handleMoveItemWithinList; fromColumnIndex ', fromColumnIndex,
	// ' fromIndex ', fromIndex, ' toIndex ', toIndex, ' list ', list);
	const newList = JSON.parse(JSON.stringify(list));
	const updateColumn = newList[fromColumnIndex];
	updateColumn.list = handleMoveList(fromIndex, toIndex, updateColumn.list);
	// console.log('newList ', newList);
	return newList;
};

export function handleMoveColumn(fromIndex, toIndex, fromList, toList) {
	const moveItem = fromList[fromIndex];

	const newFromList = [];
	fromList.forEach((item, idx) => {
		if (idx !== fromIndex) newFromList.push(item);
	});

	const newToList = [];
	toList.forEach((item, idx) => {
		if (idx === toIndex) newToList.push(moveItem);
		newToList.push(item);
	});
	return { from: newFromList, to: newToList };
}

export const handleMoveItemToList = (fromColumnIndex, fromIndex, toColumnIndex, toIndex, list) => {
	// console.log('handleMoveItemToList; fromColumnIndex ', fromColumnIndex,
	// ' toColumnIndex ', toColumnIndex, ' fromIndex ', fromIndex, ' toIndex ', toIndex, ' list ', list);

	const newList = JSON.parse(JSON.stringify(list));
	const fromColumnItem = newList[fromColumnIndex];
	const toColumnItem = newList[toColumnIndex];
	// console.log('fromColumnItem ', fromColumnItem);
	// console.log('toColumnItem ', toColumnItem);

	const update = handleMoveColumn(fromIndex, toIndex, fromColumnItem.list, toColumnItem.list);
	// console.log('update ', update);
	fromColumnItem.list = update.from;
	toColumnItem.list = update.to;

	// console.log('newList ', newList);
	return newList;
};
