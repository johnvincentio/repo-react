//

import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../containers/Layout';

import Folders from '../components/Folders';
import PlayTrack from '../components/PlayTrack';
import PlayFolder from '../components/PlayFolder';

import Test1 from '../other/Test1';

const FoldersPage = props => {
	return (
		<Layout {...props}>
			<Folders />
		</Layout>
	);
};

const PlayTrackPage = props => {
	return (
		<Layout {...props}>
			<PlayTrack folderId={props.match.params.id1} trackId={props.match.params.id2} {...props} />
		</Layout>
	);
};
PlayTrackPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id1: PropTypes.string.isRequired,
			id2: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

const PlayFolderPage = props => {
	return (
		<Layout {...props}>
			<PlayFolder folderId={props.match.params.id1} {...props} />
		</Layout>
	);
};
PlayFolderPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id1: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" render={props => <FoldersPage {...props} />} />
			<Route exact path="/play/:id1/:id2" render={props => <PlayTrackPage {...props} />} />

			<Route exact path="/play/:id1/" render={props => <PlayFolderPage {...props} />} />

			<Route exact path="/test1" component={Test1} />
			<Redirect to="/" />
		</Switch>
	</BrowserRouter>
);

export default Routes;
