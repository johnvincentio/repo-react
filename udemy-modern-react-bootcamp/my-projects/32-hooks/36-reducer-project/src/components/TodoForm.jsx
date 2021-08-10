
import React, { useContext } from 'react';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { DispatchContext } from './contexts/todos.context';

import useInputState from './hooks/useInputState';

function TodoForm() {
	console.log('TodoForm');
	const dispatch = useContext(DispatchContext);
	const [value, handleChange, reset] = useInputState('');
	return (
		<Paper style={{ margin: '1rem 0', padding: '0 1rem' }}>
			<form
				onSubmit={e => {
					e.preventDefault();
					dispatch({ type: 'ADD', task: value });
					reset();
				}}
			>
				<TextField
					value={value}
					onChange={handleChange}
					margin='normal'
					label='Add New Todo'
					fullWidth
				/>
			</form>
		</Paper>
	);
}

export default TodoForm;