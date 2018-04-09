
import {
	COMMAND_INITIALIZE,
	COMMAND_ADD,
	COMMAND_EDIT,
} from '../constants/action.types';

const initialState = {
	command: {
		commandedType: '',
	},
};

/*
* Handle all command functions
*/
function command(state = initialState, action) {
	// console.log('command.reducer, action', action, ' state ', state);
	switch (action.type) {
		case COMMAND_ADD:
			if (state.command.commandedType === 'add') {
				return initialState;
			}
			return {
				command: {
					commandedType: 'add',
				},
			};

		case COMMAND_EDIT:
			if (state.command.commandedType === 'edit') {
				return initialState;
			}
			return {
				command: {
					commandedType: 'edit',
				},
			};

		case COMMAND_INITIALIZE:
			return initialState;

		default:
			return state;
	}
}

export default command;
