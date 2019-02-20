
import React from 'react';

import Button from './button/Button';
import withButton from './button/withButton';

class App extends React.Component {

	onClick = () => {
		console.log('onClick');
	}

	render() {
		const WrappedButton = withButton(Button);
		return (
			<div className="ui container">
				<Button className="ui button negative" />
				<WrappedButton onClick={() => this.onClick()} />
			</div>
		);
	}
}

export default App;
