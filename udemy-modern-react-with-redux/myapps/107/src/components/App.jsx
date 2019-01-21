//

import React from 'react';

import youtube from '../api/youtube';

import SearchBar from './SearchBar';
import VideoList from './VideoList';

import './App.scss';

class App extends React.Component {

	state = { items: [] };

	onSearchSubmit = async (term) => {
		const response = await youtube.get('/search', {
			params: { q: term }
		});
		console.log('response ', response);
		this.setState({ items: response.data.items })
	};

	render() {
		return (
			<div className="ui container app-container">
				<SearchBar onSubmit={this.onSearchSubmit} />
				Found: {this.state.items.length} images
				<VideoList images={this.state.items} />
			</div>
		);
	}
}

export default App;
