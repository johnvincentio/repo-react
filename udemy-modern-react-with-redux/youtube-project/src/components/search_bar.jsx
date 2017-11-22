
import React from 'react';

export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { term: '' };
		// this.handleNewGame = this.props.onNewGame.bind(this);
		// this.handleHelp = this.handleHelp.bind(this);
	}

	// onInputChange(event) {
	// 	console.log(event.target.value);
	// }
	// return <input onChange={this.onInputChange} />

	render() {
		return (
			<div>
				<input
					value={this.state.term}
					onChange={event => this.setState({ term: event.target.value })}
				/>
				Value of the input {this.state.term}
			</div>
		);
	}
}

export default SearchBar;
