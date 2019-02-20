
import React from 'react';

function AuthWrapper(WrappedComponent) {
	return class extends React.Component {
		render() {
			if (this.props.isLoggedIn) {
				return <WrappedComponent {...this.props} />
			}
			return <p>You're not logged in</p>
		}
	}
}

export default AuthWrapper;
