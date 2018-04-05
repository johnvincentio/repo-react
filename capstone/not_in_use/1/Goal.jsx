
import React from 'react';

export default class Goal extends React.Component {
	constructor(props) {
		console.log('>>> Goal; constructor');
		super(props);
		console.log(props);
		console.log('<<< Goal; constructor');
	}

	render() {
		return (
			<div>
				{this.props.list.text}
			</div>
		);
	}
}
