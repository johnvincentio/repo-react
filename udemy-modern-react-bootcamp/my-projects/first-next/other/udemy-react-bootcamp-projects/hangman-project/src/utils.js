//

/*
word = 'abc'
returns:
{ a: false, b: false, c: false }
*/
export function convertStringtoObject(word) {
	const obj = [...word].reduce((ac,a) => ({...ac,[a]: false}),{});
	// console.log(obj);
	return obj;
}

/*
word = 'abc'
returns:
[ { id: 0, key: 'a', value: false }, { id: 1, key: 'b', value: false }, { id: 2, key: 'c', value: false } ]
*/
export function convertStringtoArrayObject(word) {
	const obj = [...word].map((letter, id)  =>  ({ id, key: letter, value: false }));
	// console.log('obj ', obj);
	return obj;
}

/*
[ { id: 0, key: 'a', value: false }, { id: 1, key: 'b', value: false }, { id: 2, key: 'c', value: false } ]
returns:
'abc'
*/
export function convertArrayObjectsToString(arr) {
	const str = arr.reduce((ac, a) => (ac + a.key), '');
	// console.log('str ', str)
	return str;
}

/*
[ { id: 0, key: 'A', value: false }, { id: 1, key: 'B', value: false }, { id: 2, key: 'C', value: false } ], 'B'
returns:
[ { id: 0, key: 'A', value: false }, { id: 1, key: 'B', value: true }, { id: 2, key: 'C', value: false } ]'
*/
export function updateArrayObjectsForLetter(arr, key) {
	// console.log('updateArrayObjectsForLetter; arr ', arr, ' key ', key);
	const obj = arr.map(letter => ({
		id: letter.id,
		key: letter.key,
		value: (key === letter.key ? true : letter.value)
	}));
	// console.log('updateArrayObjectsForLetter; obj ', obj);
	return obj;
}

/*
[ { id: 0, key: 'A', value: false }, { id: 1, key: 'B', value: false }, { id: 2, key: 'C', value: false } ], 'B'
returns:
	true
*/
export function isLetterInArrayObjects(arr, key) {
	// console.log('isLetterInArrayObjects; arr ', arr, ' key ', key);
	let bool = false;
	arr.forEach(letter => { if (key === letter.key) bool = true });
	// console.log('isLetterInArrayObjects; bool ', bool);
	return bool;
}

/*
[ { id: 0, key: 'A', value: true }, { id: 1, key: 'B', value: true }, { id: 2, key: 'C', value: true } ]
returns:
	true
*/
export function isArrayObjectsComplete(arr) {
	// console.log('isArrayObjectsComplete; arr ', arr);
	let bool = true;
	arr.forEach(letter => { 
		if (! letter.value) bool = false;
	});
	// console.log('isArrayObjectsComplete; bool ', bool);
	return bool;
}
