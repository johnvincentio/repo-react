
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StreamCreate, StreamDelete, StreamEdit, StreamList, StreamShow } from '../components/streams';

import Header from '../components/Header';

const Root = () => (
	<div className="ui container">
		<Router>
			<Switch>
				<Header />
				<Route exact path="/" component={StreamList} />
				<Route exact path="/streams/new" component={StreamCreate} />
				<Route exact path="/streams/edit" component={StreamEdit} />
				<Route exact path="/streams/delete" component={StreamDelete} />
				<Route exact path="/streams/show" component={StreamShow} />
			</Switch>
		</Router>
	</div>
);

export default Root;
