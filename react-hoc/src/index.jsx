
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import App2 from './components/App2';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<div>
			<App />
			<App2 />
		</div>,
		document.getElementById('root')
	);
});
