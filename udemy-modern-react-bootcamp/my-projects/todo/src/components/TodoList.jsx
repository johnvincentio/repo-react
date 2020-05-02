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

	handleToggleComplete = id => {
		console.log('TodoList::handleToggleComplete; id ', id);
		this.setState(prevState => {
			const list = prevState.todos.map(todo => {
				if (todo.id === id) {
					return { ...todo, complete: !todo.complete };
				}
				return todo;
			});
			return { todos: list }
		});
	}

	handleEdit = todo => {
		console.log('TodoList::handleEdit; todo ', todo);
		this.setState(prevState => {
			const list = prevState.todos.map(item => {
				if (todo.id === item.id) {
					return { ...todo };
				}
				return todo;
			});
			return { todos: list }
		});
	}

	handleDelete = id => {
		this.setState(prevState => ({ todos: prevState.todos.filter(todo => id !== todo.id) }));
	}

	render() {
		console.log('TodoList::render(); this.props ', this.props, ' this.state ', this.state);
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
							toggleState={() => this.handleToggleComplete(todo.id)}
							edit={this.handleEdit}
							delete={() => this.handleDelete(todo.id)}
						/>
					)}
				</div>
				<TodoForm add save={this.addTodo} />
			</div>
		);
	}
}

export default TodoList;
