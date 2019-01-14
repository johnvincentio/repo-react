//

import React from 'react';
import ReactDOM from 'react-dom';

import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: null,
			errorMessage: null
		};
	}

	// state = {
	// 	lat: null,
	// 	long: null,
	// 	errorMessage: null
	// };

	componentDidMount() {
		console.log('>>> App; componentDidMount');
		window.navigator.geolocation.getCurrentPosition(
			position => this.setState({ lat: position.coords.latitude }),
			err => this.setState({ errorMessage: err.message })
		);
		// window.navigator.geolocation.getCurrentPosition(
		// 	(position) => {
		// 		this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
		// 		console.log(position);
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 		this.setState({ errorMessage: err.message })
		// 	}
		// );
		console.log('<<< App; componentDidMount');
	}

	componentDidUpdate() {
		console.log('--- App; componentDidUpdate');
	}

	render() {
		if (this.state.errorMessage) {
			return <div>Error Message: {this.state.errorMessage} </div>
		}
		if (this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />
		}
		return (
			<Spinner message="Please accept location request" />
		);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
});

/*
	<Spinner />

	render() {
		return (
			<div>
				{this.state.errorMessage && (
					<div>Error Message: {this.state.errorMessage} </div>
				)}
				{!this.state.errorMessage && (
					<div>Latitude: {this.state.lat} Longitude: {this.state.long}</div>
				)}
			</div>
		);
	}
*/
