//

import React from 'react';

import { IAction, IEpisode } from './interfaces';

import { Store } from './Store';

import './App.scss';

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
			payload: dataJSON._embedded.episodes
		});
	};

	const toggleFavAction = (episode: IEpisode): IAction => {
		const dispatchObj = {
			type: 'ADD_FAV',
			payload: episode
		};
		return dispatch(dispatchObj);
	};

	// console.log('state ', state);

	return (
		<React.Fragment>
			<header className="header">
				<div>
					<h1>Rick and Morty</h1>
					<p>Pick you favorite episode</p>
				</div>
				<div>Favourite(s): {state.favourites.length}</div>
			</header>

			{console.log(state.episodes)}
			<section className="episode-layout">
				{state.episodes.map((episode: IEpisode) => {
					return (
						<section key={episode.id} className="episode-box">
							<img src={episode.image.medium} alt={episode.name} />
							<div>{episode.name}</div>
							<section>
								<div>
									Season: {episode.season} Number: {episode.number}
								</div>
								<button type="button" onClick={() => toggleFavAction(episode)}>
									{state.favourites.find((fav: IEpisode) => fav.id === episode.id) ? 'Unfav' : 'Fav'}
								</button>
							</section>
						</section>
					);
				})}
			</section>
		</React.Fragment>
	);
}
