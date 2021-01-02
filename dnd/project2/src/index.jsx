
import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appTheme } from './themes/themes';

import TableExample from './1/TableExample';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={appTheme}>
			<CssBaseline />
			<TableExample />
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});
