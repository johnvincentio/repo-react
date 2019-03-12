import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import Root from './root/Root';
import App from './components/App';

import configureStore from './store/configureStore';

// import { authUser } from './redux/actions/user.actions';

const store = configureStore();

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<App />, document.getElementById('root'));
});
*/

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Router>
			<Root store={store} />
		</Router>,
		document.getElementById('root'),
	);
});
*/

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Root />
		</Provider>,
		document.getElementById('root')
	);
});

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
			<div className="devtools">
				<DevTools />
			</div>
		</Provider>,
		document.getElementById('root')
	);
});
*/
