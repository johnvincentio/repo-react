//

import React from 'react';
import PropTypes from 'prop-types';

import Layout from './Layout';

import Folders from '../components/Folders';
import PlayTrack from '../components/PlayTrack';
import PlayFolder from '../components/PlayFolder';

import { matchType } from '../types';

const Home = props => {
	console.log('Home; props ', props);

	const { datatype } = props;
	let mainDiv = '';
	let main = false;
	switch (datatype) {
		case 'play-folder':
			mainDiv = <PlayFolder folderId={props.match.params.id1} {...props} />;
			break;
		case 'play-track':
			mainDiv = <PlayTrack folderId={props.match.params.id1} trackId={props.match.params.id2} {...props} />;
			break;
		case 'all':
		default:
			mainDiv = <Folders />;
			main = true;
			break;
	}
	return <Layout main={main}>{mainDiv}</Layout>;
};

Home.propTypes = {
	datatype: PropTypes.string.isRequired,
	match: matchType.isRequired
};

export default Home;
