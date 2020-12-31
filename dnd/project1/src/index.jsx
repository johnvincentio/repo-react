
import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appTheme } from './themes/themes';

import Root from './root/Root';

// console.log(`NODE_ENV ${process.env.NODE_ENV}`);

/*
const token = localStorage.getItem('token');
if (token) {
	// console.log('*** found a token');
	store.dispatch(authUser(token));
}
*/

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={appTheme}>
			<CssBaseline />
			<Root />
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});
