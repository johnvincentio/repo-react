//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.todo };
	}

	onChange = ( {target: { name, value }}) => this.setState({ [name]: value });

	onSubmit = e => {
		e.preventDefault();
		console.log('TodoForm::onSubmit; this.state ', this.state);
		if (this.props.adding) {
			this.props.save({ ...this.state, id: uuidv4() });
		}
		else {
			this.props.save(this.state);
		}
	}

	render() {
		console.log('TodoForm::render(); this.props ', this.props, ' this.state ', this.state);
		const text = this.props.adding ? `Add Todo` : `Save`;
		return (
			<div>
				<div>
				TodoForm
				</div>
				<form onSubmit={this.onSubmit}>
					<input
						type='text'
						id='task'
						name='task'
						value={this.state.task}
						onChange={this.onChange} />
					<button type='submit'>{text}</button>
				</form>
			</div>
		);
	}
}

TodoForm.propTypes = {
	todo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		task: PropTypes.string.isRequired,
		complete: PropTypes.bool.isRequired
	}),
	adding: PropTypes.bool.isRequired,
	save: PropTypes.func.isRequired
}


TodoForm.defaultProps = {
	todo: {
		id: ``,
		task: 'New Todo',
		complete: false
	}
}

export default TodoForm;
