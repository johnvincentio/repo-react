import React from 'react';

import Gallery from './Gallery';

const data = [
	{
		id: 0,
		url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/react.ico',
		description: 'React'
	},
	{
		id: 1,
		url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/babel.ico',
		description: 'Babel'
	},
	{
		id: 2,
		url: 'https://www.johnvincent.io/internet-resources/resources/images/logos/webpack.ico',
		description: 'Webpack'
	}
];
// const message = require('./message');
// document.write(message.sayHello());

class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> App; constructor');
		console.log(props);
		console.log('<<< App; constructor');
	}

	render() {
		return (
			<div className="ui container">
				<div>App...</div>
				<Gallery images={data} />
			</div>
		);
	}
}

export default App;
