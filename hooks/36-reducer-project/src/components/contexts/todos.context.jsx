
import React, { createContext } from 'react';

import useTodoState from '../hooks/useTodoState';

export const TodosContext = createContext();

export function TodosProvider(props) {
	const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoState([]);
	return (
		<TodosContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo, editTodo }}>
			{props.children}
		</TodosContext.Provider>
	);
}