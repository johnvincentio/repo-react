
import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { term: '' };
		// this.handleNewGame = this.props.onNewGame.bind(this);
		// this.handleHelp = this.handleHelp.bind(this);
	}

	onInputChange(term) {
		console.log(term);
		this.setState({ term });
		this.props.onSearchTermChange(term);
	}

	render() {
		return (
			<div className="search-bar">
				<input
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)}
				/>
				Value of the input {this.state.term}
			</div>
		);
	}
}

export default SearchBar;
