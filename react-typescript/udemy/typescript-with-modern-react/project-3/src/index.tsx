//

import React from 'react';
import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux';

// import Root from './root/Root';
import App from './App';

import { StoreProvider } from './Store';

// import configureStore from './store/configureStore';

// const store = configureStore();

ReactDOM.render(
	<StoreProvider>
		<App />
	</StoreProvider>,
	document.getElementById('root')
);

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

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Root />
		</Provider>,
		document.getElementById('root')
	);
});
*/

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
