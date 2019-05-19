//

import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import Layout from '../containers/Layout';

import Folders from '../components/Folders';
import PlayTrack from '../components/PlayTrack';
import PlayFolder from '../components/PlayFolder';

import Test1 from '../other/Test1';

const FoldersPage = props => {
	// return <Layout {...props}>{/* <Folders /> */}</Layout>;
	return (
		<Layout {...props}>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, laudantium eos omnis nihil explicabo
				aspernatur earum recusandae distinctio incidunt qui ullam rerum. Molestias nostrum sequi nam, vitae adipisci
				vero molestiae. Cupiditate vero, ut, quibusdam molestiae quae inventore, nam error deleniti distinctio omnis
				culpa rem adipisci iusto. Aliquam, deleniti consectetur! Nulla officia unde praesentium quae porro velit atque
				ut? Repudiandae, suscipit? Nihil omnis asperiores saepe similique est, quae dolorum maiores delectus blanditiis
				accusamus natus illo perferendis unde esse ipsam deleniti suscipit quas corporis optio in ipsum dolore
				repellendus praesentium. Officia, qui. Delectus, voluptatem est adipisci molestias expedita quos voluptatibus
				voluptas assumenda! Alias, ratione voluptatum fuga iste delectus accusantium officiis dicta, natus id expedita
				minus corporis autem illo voluptate dolore nihil consequatur. Voluptates minus quo animi vel error at
				temporibus! Laudantium cum consequatur rem ut cupiditate fuga eaque delectus. Velit nulla iste natus illo
				excepturi minima repellat dolorum sed fugit, voluptate delectus?
			</p>
			<Button variant="contained" color="primary">
				Hello World
			</Button>
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
