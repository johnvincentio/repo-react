//

import React from 'react';

import NestedGrid from '../components/NestedGrid';
import ButtonAppBar from '../components/maybe/ButtonAppBar';
import SearchAppBar from '../components/maybe/SearchAppBar';
import PrimarySearchAppBar from '../components/maybe/PrimarySearchAppBar';

const Test1 = props => {
	return (
		<div>
			<ButtonAppBar />
			<SearchAppBar />
			<PrimarySearchAppBar />
			<NestedGrid />
		</div>
	);
};

export default Test1;
