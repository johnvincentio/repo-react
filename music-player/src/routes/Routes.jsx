//

import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from '../containers/Home';

import Test1 from '../other/Test1';

const PageOne = () => <div>PageOne</div>;
const PageTwo = () => <div>PageTwo</div>;

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" render={props => <Home datatype="home" {...props} />} />
			<Route exact path="/play/:id1/:id2" render={props => <Home datatype="play-track" {...props} />} />

			<Route exact path="/play/:id1/" render={props => <Home datatype="play-folder" {...props} />} />

			<Route exact path="/test1" component={Test1} />
			<Redirect to="/" />
		</Switch>
	</BrowserRouter>
);

export default Routes;

/*
<Route
	exact
	path="/"
	render={props => (
		<Layout datatype="all" {...props}>
			<PageOne />
		</Layout>
	)}
/>

<Route path="/widgets/new" render={props => <Layout datatype="create" {...props} />} />
<Route path="/widgets/edit/:id" render={props => <Layout datatype="edit" {...props} />} />
<Route path="/widgets/delete/:id" render={props => <Layout datatype="delete" {...props} />} />
<Route path="/widgets/:id" render={props => <Layout datatype="select" {...props} />} />
*/
