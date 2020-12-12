
import React, { createContext, useReducer } from 'react';

import todoReducer from '../reducers/todo.reducer';

import {useLocalStorageReducer} from '../hooks/useLocalStorageReducer';

export const TodosContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props) {
	const [todos, dispatch] = useLocalStorageReducer("keys", [], todoReducer);
//	const [todos, dispatch] = useReducer(todoReducer, []);
	return (
		<TodosContext.Provider value={todos}>
			<DispatchContext.Provider value={dispatch}>
				{props.children}
			</DispatchContext.Provider>
		</TodosContext.Provider>
	);
}
