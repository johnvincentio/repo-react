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
			edit: false
		}
	}

	handleToggleEdit = () => {
		this.setState(prevState => ({ edit: ! prevState.edit }));
	}

	handleEdit = todo => {
		this.props.edit(todo);
		this.handleToggleEdit();
	}

	render() {
		console.log('Todo::render(); this.props ', this.props, ' this.state ', this.state);
		const { todo } = this.props;
		const clz = classnames(`todo--task`, todo.complete ? `complete` : `incomplete`);
		return (
			<div>
				{this.state.edit ? (
					<TodoForm add={false} todo={todo} save={this.handleEdit} />
				) : (
					<div className="todo">
						<div
							className={clz}
							onClick={this.props.toggleState}
						>
							{todo.task}
						</div>
						<div className="todo--buttons">
							<button type="button" onClick={this.handleToggleEdit}>Edit</button>
							<button type="button" onClick={this.props.delete}>Delete</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

Todo.propTypes = {
	edit: PropTypes.func.isRequired,
	delete: PropTypes.func.isRequired,
	toggleState: PropTypes.func.isRequired,
	todo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		task: PropTypes.string.isRequired,
		complete: PropTypes.bool.isRequired
	}).isRequired
}

export default Todo;
