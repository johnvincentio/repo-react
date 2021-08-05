
import React, { useContext } from 'react';

import TextField from '@material-ui/core/TextField';

import { DispatchContext } from './contexts/todos.context';

import useInputState from './hooks/useInputState';

function EditTodoForm({ id, task, toggleEditForm }) {
	console.log('EditTodoForm; id ', id);
	const dispatch = useContext(DispatchContext);
	const [value, handleChange, reset] = useInputState(task);
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				dispatch({ type: 'EDIT', id, task: value });
				reset();
				toggleEditForm();
			}}
			style={{ marginLeft: '1rem', width: '50%' }}
		>
			<TextField
				margin='normal'
				value={value}
				onChange={handleChange}
				fullWidth
				autoFocus
			/>
		</form>
	);
}

export default EditTodoForm;
