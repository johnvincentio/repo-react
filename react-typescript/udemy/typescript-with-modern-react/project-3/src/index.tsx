//

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router';

import { StoreProvider } from './Store';

import HomePage from './HomePage';
import FavPage from './FavPage';

import App from './App';

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent;

ReactDOM.render(
	<StoreProvider>
		<Router>
			<App path="/">
				<RouterPage pageComponent={<HomePage />} path="/" />
				<RouterPage pageComponent={<FavPage />} path="/favs" />
			</App>
		</Router>
	</StoreProvider>,
	document.getElementById('root')
);
