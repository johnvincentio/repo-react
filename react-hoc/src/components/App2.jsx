
import React from 'react';

import AuthWrapper from './auth/AuthWrapper';
import RegularComponent from './auth/RegularComponent';
import FunctionalComponent from './auth/FunctionalComponent';

const WrappedOne = AuthWrapper(RegularComponent);
const WrappedTwo = AuthWrapper(FunctionalComponent);

class App2 extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false
		}
	}

	toggleAuth = () => {
		this.setState((prevState, props) => ({ isLoggedIn: !prevState.isLoggedIn }))
	}

	render() {
		const { isLoggedIn } = this.state
		return (
			<div>
				<button onClick={this.toggleAuth}>{isLoggedIn ? 'Logout' : 'Login'}</button>
				<WrappedOne isLoggedIn={isLoggedIn} />
				<WrappedTwo isLoggedIn={isLoggedIn} />
			</div>
		);
	}
}

export default App2;
