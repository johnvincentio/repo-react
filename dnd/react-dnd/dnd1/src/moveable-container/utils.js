
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
