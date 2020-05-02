/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import classnames from 'classnames';

class Todo extends React.Component {

	render() {
		console.log('Todo::render(); this.props ', this.props);
		const { todo } = this.props;
		const clz = classnames(`todo--task`, todo.complete ? `complete` : `incomplete`);
		return (
			<div className="todo">
				<div
					className={clz}
					onClick={this.props.toggleState}
				>
					{todo.task}
				</div>
			</div>
		);
	}
}

export default Todo;
