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
				<h1>Todo List! <span>An Animated Todo List Made With React</span></h1>
				<TodoForm adding save={this.create} />
				<div className="todolist--list">
					{this.state.todos.map(todo =>
						<Todo
							key={todo.id}
							todo={todo}
							toggleComplete={this.toggleComplete}
							update={this.update}
							remove={this.remove}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default TodoList;
