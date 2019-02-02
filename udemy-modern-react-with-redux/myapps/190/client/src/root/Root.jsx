
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StreamCreate, StreamDelete, StreamEdit, StreamList, StreamShow } from '../components/streams';

import Header from '../components/Header';

const Root = () => (
	<div className="ui container">
		<Router>
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={StreamList} />
					<Route exact path="/streams/new" component={StreamCreate} />
					<Route exact path="/streams/edit/:id" component={StreamEdit} />
					<Route exact path="/streams/delete/:id" component={StreamDelete} />
					<Route exact path="/streams/show:/id" component={StreamShow} />
				</Switch>
			</div>
		</Router>
	</div>
);

export default Root;
