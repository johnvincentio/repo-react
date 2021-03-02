
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

export 	const moveTaskToContainer = (fromColumnid, toColumnid, fromIndex, toIndex) => {
	// console.log('MultipleMoveable::moveTaskToContainer; fromColumnid ', fromColumnid,
	// ' toColumnid ', toColumnid, ' fromIndex ', fromIndex, ' toIndex ', toIndex);
	const { datatype, subtype } = dataObject;
	const newObject = { ...dataObject };
	const fromColumnItem = newObject.data.find(item => item.columnid === fromColumnid);
	// console.log('fromColumnItem ', fromColumnItem);
	const toColumnItem = newObject.data.find(item => item.columnid === toColumnid);
	// console.log('toColumnItem ', toColumnItem);

	const fromMoveId = fromColumnItem.list[fromIndex].id;
	const toMoveId = toColumnItem.list[toIndex].id;
	const containerId = toColumnItem.columnid;

	const update = handleMoveList(fromIndex, toIndex, fromColumnItem.list, toColumnItem.list);
	// console.log('update ', update);
	fromColumnItem.list = update.from;
	toColumnItem.list = update.to;
	// console.log('newObject ', newObject);
	// setDataObject(newObject);
};

