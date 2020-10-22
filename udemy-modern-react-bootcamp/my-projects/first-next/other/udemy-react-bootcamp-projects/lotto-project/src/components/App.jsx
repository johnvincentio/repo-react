//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import Lottery from './Lottery';

class App extends React.Component {

	render() {
		return (
			<div className="app">
				<Lottery />
				<Lottery title="Mini Daily" numBalls={4} maxNum={10} />
			</div>
		);
	}
}

export default App;
