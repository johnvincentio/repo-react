
import {
	COMMAND_INITIALIZE,
	COMMAND_ADD,
	COMMAND_EDIT,
} from '../constants/action.types';

/*
* Handle all command functions
*/

export const commandInitialize = () => ({
	type: COMMAND_INITIALIZE,
});

export const commandAdd = () => ({
	type: COMMAND_ADD,
});

export const commandEdit = () => ({
	type: COMMAND_EDIT,
});
