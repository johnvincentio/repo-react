import React from 'react';

import SurpriseButton from './SurpriseButton';
import SurpriseImage from './SurpriseImage';

export default class Surprise extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showButton: true
		};
	}

	toggle() {
		this.setState({ showButton: !this.state.showButton });
	}

	render() {
		// Show the button to start with
		return this.state.showButton ? (
			<SurpriseButton toggle={() => this.toggle()} />
		) : (
			<SurpriseImage />
		);
	}
}
