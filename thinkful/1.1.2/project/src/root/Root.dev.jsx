import React from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import DevTools from './DevTools';

import App from '../components/App';
import NotFoundPage from '../components/NotFoundPage';

const Root = () => (
	<div>
		{' '}
		{/* comment */}
		<Router>
			<Switch>
				<Route path="/" component={App} />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
		<div className="devtools">
			<DevTools />
		</div>
	</div>
);

export default Root;
