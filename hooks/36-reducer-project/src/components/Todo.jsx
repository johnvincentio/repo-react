
import React, { useContext } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { DispatchContext } from './contexts/todos.context';

import EditTodoForm from './EditTodoForm';

import useToggleState from './hooks/useToggleState';

function Todo({ id, task, completed }) {
	console.log('Todo; id ', id);
	const dispatch = useContext(DispatchContext);
	const [isEditing, toggle] = useToggleState(false);
	return (
		<ListItem style={{ height: '64px' }}>
			{isEditing ? (
				<EditTodoForm
					id={id}
					task={task}
					toggleEditForm={toggle}
				/>
			) : (
				<>
					<Checkbox
						tabIndex={-1}
						checked={completed}
						onClick={() => dispatch({ type: 'TOGGLE', id })}
					/>
					<ListItemText
						style={{ textDecoration: completed ? 'line-through' : 'none' }}
					>
						{task}
					</ListItemText>
					<ListItemSecondaryAction>
						<IconButton aria-label='Delete' onClick={() => dispatch({ type: 'REMOVE', id })}>
							<DeleteIcon />
						</IconButton>
						<IconButton aria-label='Edit' onClick={toggle}>
							<EditIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</>
			)}
		</ListItem>
	);
}

export default Todo;
