
import { useReducer, useEffect } from 'react';

function useLocalStorageReducer(key, defaultValue = [], reducer) {
	const [state, dispatch] = useReducer(reducer, defaultValue, () => {
		let val;
		try {
			val = JSON.parse(window.localStorage.getItem(key) || String(defaultValue));
		}
		catch {
			val = defaultValue;
		}
		return val;
	});
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [state]);

	return [state, dispatch];
};

export { useLocalStorageReducer };
