//

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import * as actions from '../../redux/actions/';

import Error from '../tools/Error';

import Icon from '../tools/Icon';

import { Styles } from '../register/RegisterStyles';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_APP_ID;

class LoginGoogle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			google_auth: false,
			error_text: ''
		};
	}

	componentWillMount() {
		// console.log('LoginGoogle::componentWillMount; props ', this.props);
		window.gapi.load('auth2', this.initClient);
	}

	setGoogleStatus = () => {
		// console.log('LoginGoogle::setGoogleStatus()');
		const auth = window.gapi.auth2.getAuthInstance();
		const bool = auth.isSignedIn.get();
		this.setState({ google_auth: bool });
	};

	initClient = () => {
		// console.log('LoginGoogle::initClient(), GOOGLE_CLIENT_ID ', GOOGLE_CLIENT_ID);
		window.gapi.auth2.init({ client_id: GOOGLE_CLIENT_ID }).then(() => {
			this.setGoogleStatus();
		});
	};

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('LoginGoogle::shouldComponentUpdate; nextProps ', nextProps, ' nextState ', nextState);
	// 	if (nextProps.authenticated) {
	// 		nextProps.history.push('/dashboard');
	// 		return false;
	// 	}
	// 	return true;
	// }

	handleGoogleSubmit = () => {
		// console.log('LoginGoogle::handleGoogleSubmit()');
		// console.log("'click', User selected Log in with Google");
		const auth2 = window.gapi.auth2.getAuthInstance();
		const signedIn = auth2.isSignedIn.get();
		// console.log(`bool ${signedIn}`);
		if (signedIn) {
			// console.log('already connected');
			this.handleGoogleLogin();
		} else {
			// console.log('not connected');
			window.gapi.auth2
				.getAuthInstance()
				.signIn()
				.then(() => {
					const bool = auth2.isSignedIn.get();
					// console.log(`bool ${bool}`);
					if (bool) {
						// console.log('now is connected');
						this.handleGoogleLogin();
					}
				});
		}
	};

	handleGoogleLogin = () => {
		// console.log('LoginGoogle::handleGoogleLogin()');
		const auth2 = window.gapi.auth2.getAuthInstance();
		const googleUser = auth2.currentUser.get();
		const profile = googleUser.getBasicProfile();
		// console.log(`profile id ${profile.getId()}`);
		const idToken = googleUser.getAuthResponse().id_token;
		// console.log(`idToken ${idToken}`);

		this.props.actions
			.signinGoogleUser({
				email: profile.getEmail(),
				id: idToken
			})
			.catch(error => {
				this.setState({ error_text: error.message });
				this.setGoogleStatus();
			});
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Error text={this.state.error_text} />

				<Button
					className={classNames(classes.button, classes.googleButton)}
					variant="raised"
					onClick={this.handleGoogleSubmit}
				>
					{this.state.google_auth ? <span>Continue with Google</span> : <span>Log in with Google</span>}
					<Icon name="google" css={classNames(classes.svg, classes.googleSvg)} />
				</Button>
			</Fragment>
		);
	}
}

LoginGoogle.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	actions: PropTypes.shape({
		signinGoogleUser: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(Styles), connect(null, mapDispatchToProps))(LoginGoogle);
