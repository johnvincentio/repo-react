//

import React from 'react';

import Button from '@material-ui/core/Button';

import Outer from '../containers/Outer';
import Inner from '../containers/Inner';

/*
Yoga/Donna De Lory/The Lover and the Beloved/01 - Ganapati Om.mp3
*/

// const FILE = '/Yoga/Donna De Lory/The Lover and the Beloved/01 - Ganapati Om.mp3';

// const FILE = '/Donna De Lory/The Lover and the Beloved/01 - Ganapati Om.mp3';
// const URL = `http://localhost:9002${FILE}`;

// const URL = '/music/jv.mp3';

// 01 - Brideshead Revisited Theme

// const URL = '/music/music.mp3';

// const FILE = '/Donna De Lory/The Lover and the Beloved/01 - Ganapati Om.mp3';
const URL = `http://localhost:8090/Odds-and-Ends/01 - Brideshead Revisited Theme.mp3`;

const PlayTrack = props => {
	console.log('PlayTrack, props ', props);
	return (
		<Outer>
			<Inner>
				<audio controls>
					<source src={URL} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			</Inner>
		</Outer>
	);
};

export default PlayTrack;
