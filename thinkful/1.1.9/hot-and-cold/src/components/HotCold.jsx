//

import React from 'react';

import Game from './Game';
import Help from './Help';
import Navigation from './Navigation';

export default class HotCold extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// characters: props.characters,
			search: ''
		};
	}

	// setSearch = search => {
	// 	this.setState({ search, characters: this.createList(search) });
	// };

	// createList(search) {
	// 	if (search && search.length > 0) {
	// 		return this.props.characters.filter(item =>
	// 			item.name.toLowerCase().includes(search.toLowerCase())
	// 		);
	// 	}
	// 	return this.props.characters;
	// }

	render() {
		return (
			<div className="hot-cold">
				<Navigation />
				<Help />
				<Game />
				{/* <SearchForm value={this.state.search} onChange={value => this.setSearch(value)} />
				<CharacterCount count={this.state.characters.length} />
				<CharacterList characters={this.state.characters} /> */}
			</div>
		);
	}
}
