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
			showHelp: false
		};
	}

	toggleHelp() {
		this.setState({ showHelp: !this.state.showHelp });
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
				{!this.state.showHelp && <Navigation toggleHelp={() => this.toggleHelp()} />}
				{this.state.showHelp && <Help toggleHelp={() => this.toggleHelp()} />}
				{!this.state.showHelp && <Game />}
			</div>
		);
	}
}
