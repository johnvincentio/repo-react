
import React from 'react';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_APP_ID;

/*
gapi.auth2.getAuthInstance().signOut();
gapi.auth2.getAuthInstance().signIn();
*/

class GoogleAuthentication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: null		// not known initially
		};
	}

	componentDidMount() {
		window.app.gapiPromise.then(() => {
			window.gapi.load('client:auth2', () => {
				window.gapi.client.init({
					client_id: GOOGLE_CLIENT_ID,
					scope: 'email'
				}).then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
			});
		});
	}

	// setGoogleStatus = () => {
	// 	// console.log('LoginGoogle::setGoogleStatus()');
	// 	const auth2 = window.gapi.auth2.getAuthInstance();
	// 	const signedin = auth2.isSignedIn.get();
	// 	// console.log('LoginGoogle::setGoogleStatus(); signedin ', signedin);
	// 	this.setState({ isSignedIn: signedin, ready: true });
	// 	auth2.isSignedIn.listen(this.onAuthChange);
	// };

	onAuthChange = () => {
		const auth2 = window.gapi.auth2.getAuthInstance();
		this.setState({ isSignedIn: auth2.isSignedIn.get() })
	}

	onSignInClick = () => {
		const auth2 = window.gapi.auth2.getAuthInstance();
		auth2.signIn();
	}

	onSignOutClick = () => {
		const auth2 = window.gapi.auth2.getAuthInstance();
		auth2.signOut();
	}

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null
		}
		if (this.state.isSignedIn) {
			return (
				<button type="button" onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		}
		return (
			<button type="button" onClick={this.onSignInClick} className="ui red google button">
				<i className="google icon" />
				Sign In with Google
			</button>
		)
	}

	render() {
		return (
			<div>{this.renderAuthButton()}</div>
		)
	}
}

export default GoogleAuthentication;
