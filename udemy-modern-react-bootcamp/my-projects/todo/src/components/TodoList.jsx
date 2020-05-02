//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import TodoForm from './TodoForm';
import Todo from './Todo';

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		}
	}

	create = todo => {
		this.setState(prevState => ({	todos: [ ...prevState.todos, todo] }));
	}

	update = todo => {
		// console.log('TodoList::update; todo ', todo, ' this.state ', this.state);
		this.setState(prevState => {
			const todos = prevState.todos.map(item => {
				return todo.id === item.id ? { ...todo } : item;
			});
			return { todos };
		});
	}

	remove = id => {
		this.setState(prevState => ({ todos: prevState.todos.filter(todo => id !== todo.id) }));
	}

	toggleComplete = id => {
		// console.log('TodoList::toggleComplete; id ', id);
		this.setState(prevState => {
			const todos = prevState.todos.map(todo => {
				return todo.id === id ? { ...todo, complete: !todo.complete } : todo;
			});
			return { todos }
		});
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
							toggleComplete={() => this.toggleComplete(todo.id)}
							update={this.update}
							remove={() => this.remove(todo.id)}
						/>
					)}
				</div>
				<TodoForm adding save={this.create} />
			</div>
		);
	}
}

export default TodoList;
