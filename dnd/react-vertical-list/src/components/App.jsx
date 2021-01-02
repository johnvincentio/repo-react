
import React from 'react';

import List from './List';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Orange']
		}
	}

	render() {
		return (
			<div>
				<List colors={this.state.colors} />
			</div>
		)
	}
}

export default App;
