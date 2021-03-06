//

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import TodoForm from './TodoForm';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			update: false
		}
	}

	handleToggleUpdate = () => {
		this.setState(prevState => ({ update: ! prevState.update }));
	}

	handleToggle = () => {
		this.props.toggleComplete(this.props.todo.id);
	}

	handleUpdate = todo => {
		this.props.update(todo);
		this.handleToggleUpdate();
	}

	handleRemove = () => {
		this.props.remove(this.props.todo.id);
	}

	render() {
		// console.log('Todo::render(); this.props ', this.props, ' this.state ', this.state);
		const { todo } = this.props;
		const clz = classnames(`todo--task`, todo.complete ? `complete` : `incomplete`);
		return (
			<div>
				{this.state.update ? (
					<TodoForm adding={false} todo={todo} save={this.handleUpdate} />
				) : (
					<div className="todo">
						<div
							className={clz}
							onClick={this.handleToggle}
						>
							{todo.task}
						</div>
						<div className="todo--buttons">
							<button type="button" onClick={this.handleToggleUpdate}>
								<i className='fas fa-pen' />
							</button>
							<button type="button" onClick={this.handleRemove}>
								<i className='fas fa-trash' />
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

Todo.propTypes = {
	update: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	toggleComplete: PropTypes.func.isRequired,
	todo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		task: PropTypes.string.isRequired,
		complete: PropTypes.bool.isRequired
	}).isRequired
}

export default Todo;
