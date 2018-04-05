
import {
	IS_SIDEBAR_OPEN,
	OPEN_SIDEBAR,
	CLOSE_SIDEBAR,
} from '../constants/action.types';

/* eslint-disable import/prefer-default-export */
export const isSidebarOpen = () => ({
	type: IS_SIDEBAR_OPEN,
});

export const OpenSidebar = () => ({
	type: OPEN_SIDEBAR,
});

export const CloseSidebar = () => ({
	type: CLOSE_SIDEBAR,
});
