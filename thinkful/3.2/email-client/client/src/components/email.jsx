//

/* eslint-disable import/no-named-as-default */

import React from 'react';

// HashRouter or BrowserRouter

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Sidebar from './sidebar';
import SingleEmail from './single-email';
import EmailList from './email-list';

import './email.scss';

export default function Email() {
	return (
		<Router>
			<div className="email">
				<Sidebar />
				<main>
					<Switch>
						<Redirect exact from="/" to="/inbox" />
						<Route exact path="/:folderId" component={EmailList} />
						<Route exact path="/:folderId/:emailId" component={SingleEmail} />
						<Redirect to="/" />
					</Switch>
				</main>
			</div>
		</Router>
	);
}
