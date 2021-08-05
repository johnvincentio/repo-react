//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import TodoList from './TodoList';

class App extends React.Component {

	render() {

		return (
			<div>
				<TodoList />
			</div>
		);
	}
}

export default App;
