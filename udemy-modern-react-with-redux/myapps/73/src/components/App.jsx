//

import React from 'react';

import SearchBar from './SearchBar';

import './App.scss';

class App extends React.Component {

	onSearchSubmit = (term) => {
		console.log('--- onSearchSubmit; term ', term)
	}

	render() {
		return (
			<div className="ui container app-container">
				<SearchBar onSubmit={this.onSearchSubmit} />
			</div>
		);
	}
}

export default App;


