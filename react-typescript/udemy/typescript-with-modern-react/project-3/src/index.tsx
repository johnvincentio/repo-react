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
