
import React, { createContext, useReducer } from 'react';

import todoReducer from '../reducers/todo.reducer';

// import useTodoState from '../hooks/useTodoState';

export const TodosContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props) {
	const [todos, dispatch] = useReducer(todoReducer, []);

	// const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoState([]);
	return (
		<TodosContext.Provider value={todos}>
			<DispatchContext.Provider value={dispatch}>
				{props.children}
			</DispatchContext.Provider>
		</TodosContext.Provider>
	);
}
