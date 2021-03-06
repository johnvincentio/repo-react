
import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appTheme } from './themes/themes';

// import App1 from './basic/App';
// import App2 from './row-dnd/App';
// import App3 from './column-ordering/App';
// import App4 from './column-dnd/App';

import App from './table-column-reorder-dnd-example/App';

// import App2 from './2/App';
// import App3 from './3/App';
// import App4 from './4/App';
// import App5 from './5/App';
// import App6 from './6/App';
// import App7 from './7/App';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={appTheme}>
			<CssBaseline />
			<App />
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});
