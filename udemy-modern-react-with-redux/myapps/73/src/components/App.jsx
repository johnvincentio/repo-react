//

import React from 'react';

import unsplash from '../api/unsplash';

import SearchBar from './SearchBar';

import './App.scss';

class App extends React.Component {

	state = { images: [] };

	onSearchSubmit = async (term) => {
		console.log('--- onSearchSubmit; term ', term);
		const response = await unsplash.get('search/photos', {
			params: { query: term }
		});
		console.log('response ', response.data.results);
		this.setState({ images: response.data.results })
	};

	// JVonSearchSubmit(term) {
	// 	console.log('--- onSearchSubmit; term ', term);
	// 	console.log('API_PATH ', env.API_PATH);
	// 	this.abc = 'abc';
	// }

	render() {
		return (
			<div className="ui container app-container">
				<SearchBar onSubmit={this.onSearchSubmit} />
				Found: {this.state.images.length} images
			</div>
		);
	}
}

export default App;

// .then((response) => {
// 	console.log('response ', response.data.results);
// })
