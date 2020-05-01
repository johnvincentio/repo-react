//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import TodoForm from './TodoForm';
import Todo from './Todo';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [{ id: 1, task: 'wash face', complete: false }]
		}
	}

	addTodo = todo => {
		console.log('addTodo ', todo)
		this.setState(prevState => ({	todos: [ ...prevState.todos, todo] }));
	}

	render() {

		return (
			<div>
				<div>
					<h1>Todo List!</h1>
					<h2>A Simple React Todo List App</h2>
				</div>
				<div>
					{this.state.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
				</div>
				<TodoForm add={this.addTodo} />
			</div>
		);
	}
}

export default App;
