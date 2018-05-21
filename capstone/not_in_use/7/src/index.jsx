import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appTheme } from './themes/themes';

import Root from './root/Root';

import configureStore from './store/configureStore';

// import { AUTH_USER } from './redux/user.constants';

const store = configureStore();

// console.log(`NODE_ENV ${process.env.NODE_ENV}`);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
// TODO; check if the token has expired... if is has, then remove it.
if (token) {
	console.log('*** found a token');
	// we need to update application state
	// store.dispatch({ type: AUTH_USER });
}

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={appTheme}>
			<CssBaseline />
			<Provider store={store}>
				<Root />
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});
