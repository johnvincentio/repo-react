//

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './store';

import InterestCalculator from './components/InterestCalculator';
import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<InterestCalculator />
	</Provider>,
	document.getElementById('root')
);
