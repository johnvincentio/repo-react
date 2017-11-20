
import React from 'react';

export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleNewGame = this.props.onNewGame.bind(this);
		this.handleHelp = this.handleHelp.bind(this);
	}

	onInputChange() {

	}

	render() {
		return <input onChange={this.onInputChange} />;
	}
}

export default SearchBar;
