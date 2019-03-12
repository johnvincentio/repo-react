//

import React from 'react';
import { Store } from './Store';

export default function App(): JSX.Element {
	const { state, dispatch } = React.useContext(Store);

	React.useEffect(() => {
		state.episodes.length === 0 && fetchDataAction();
	});

	const fetchDataAction = async () => {
		const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
		const data = await fetch(URL);
		const dataJSON = await data.json();
		return dispatch({
			type: 'FETCH_DATA',
			payload: dataJSON
		});
	};

	console.log(state);

	return (
		<React.Fragment>
			<h1>Some h1</h1>
			<p>Some p</p>
		</React.Fragment>
	);
}
