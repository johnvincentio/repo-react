//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

class Todo extends React.Component {

	render() {

		return (
			<div>
				{this.props.todo.task}
			</div>
		);
	}
}

export default Todo;
