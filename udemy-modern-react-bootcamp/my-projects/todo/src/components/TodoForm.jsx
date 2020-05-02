//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: 'New Todo'
		}
	}

	onChange = ( {target: { name, value }}) => this.setState({ [name]: value });

	onSubmit = e => {
		e.preventDefault();
		this.props.add({ ...this.state, id: uuidv4(), complete: false })
	}

	render() {

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
					<button type='submit'>Add Todo</button>
				</form>
			</div>
		);
	}
}

TodoForm.propTypes = {
	add: PropTypes.func.isRequired
}

export default TodoForm;
