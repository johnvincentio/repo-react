//

import React from 'react';

import Button from '@material-ui/core/Button';

import Outer from '../containers/Outer';
import Inner from '../containers/Inner';

const PlayFolder = props => {
	console.log('PlayFolder, props ', props);
	return (
		<Outer>
			<Inner>
				<Button>Hi</Button>
			</Inner>
		</Outer>
	);
};

export default PlayFolder;
