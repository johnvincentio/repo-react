//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import TodoForm from './TodoForm';
import Todo from './Todo';

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [{ id: `1`, task: 'wash face', complete: false }]
		}
	}

	addTodo = todo => {
		this.setState(prevState => ({	todos: [ ...prevState.todos, todo] }));
	}

	handleToggleStatus = id => {
		console.log('TodoList::handleToggleStatus; id ', id);
		this.setState(prevState => {
			const list = prevState.todos.map(todo => {
				if (todo.id === id) {
					return { ...todo, complete: !todo.complete };
				}
				return todo;
			});
			return { todos: list }
		})
	}

	handleEdit = id => {
		console.log('TodoList::handleEdit; id ', id);
	}

	handleDelete = id => {
		this.setState(prevState => ({ todos: prevState.todos.filter(todo => id !== todo.id) }));
	}

	render() {

		return (
			<div className="todolist">
				<div className="todolist--header">
					<h1>Todo List!</h1>
					<h2>A Simple React Todo List App</h2>
				</div>
				<div className="todolist--list">
					{this.state.todos.map(todo =>
						<Todo
							key={todo.id}
							todo={todo}
							toggleState={() => this.handleToggleStatus(todo.id)}
							edit={() => this.handleEdit(todo.id)}
							delete={() => this.handleDelete(todo.id)}
						/>
					)}
				</div>
				<TodoForm add={this.addTodo} />
			</div>
		);
	}
}

export default TodoList;
