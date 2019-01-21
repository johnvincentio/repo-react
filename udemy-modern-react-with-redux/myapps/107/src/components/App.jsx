//

import React from 'react';

import youtube from '../api/youtube';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import './App.scss';

class App extends React.Component {

	state = { videos: [] };

	onSearchSubmit = async (term) => {
		const response = await youtube.get('/search', {
			params: { q: term }
		});
		console.log('response ', response);
		this.setState({ videos: response.data.items })
	};

	render() {
		return (
			<div className="ui container app-container">
				<SearchBar onSubmit={this.onSearchSubmit} />
				Found: {this.state.videos.length} images
				<VideoDetail />
				<VideoList videos={this.state.videos} />
			</div>
		);
	}
}

export default App;
