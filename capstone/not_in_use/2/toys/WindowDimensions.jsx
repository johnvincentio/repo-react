
import React from 'react';

export default class WindowDimensions extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> WindowDimensions; constructor');
		console.log(props);
		this.state = { width: 0, height: 0 };
		console.log(this.state);
		this.updateDimensions = this.updateDimensions.bind(this);
		console.log('<<< WindowDimensions; constructor');
	}

	componentWillMount() {
		console.log('componentWillMount');
		this.updateDimensions();
	}
	componentDidMount() {
		console.log('componentDidMount');
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		console.log('componentWillUnmount');
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions() {
		console.log('>>> updateDimensions');
		console.log(this.state);
		const w = window;
		const d = document;
		const { documentElement } = d;
		const body = d.getElementsByTagName('body')[0];
		const w1 = w.innerWidth || documentElement.clientWidth || body.clientWidth;
		const h1 = w.innerHeight || documentElement.clientHeight || body.clientHeight;
		this.setState({ width: w1, height: h1 });
		console.log('<<< updateDimensions');
	}

	render() {
		console.log('--- render');
		return (
			<span>{this.state.width} x {this.state.height}</span>
		);
	}
}
