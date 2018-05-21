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

class LoginFacebook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			facebook_auth: false,
			error_text: ''
		};
	}

	componentWillMount() {
		console.log('LoginFacebook::componentWillMount; props ', this.props);
		this.setFacebookStatus();
	}

	setFacebookStatus = () => {
		console.log('LoginFacebook::setFacebookStatus()');
		window.FB.getLoginStatus(response => {
			if (response.status === 'connected') {
				this.setState({ facebook_auth: true });
				// response.asccessToken.accessToken
				// response.asccessToken.userID
			} else {
				this.setState({ facebook_auth: false });
			}
		});
	};

	handleFacebookSubmit = () => {
		console.log('LoginFacebook::handleFacebookSubmit()');
		console.log("'click', User selected Log in with Facebook");
		// window.location.href = '/login/facebook';
		window.FB.login(response => {
			console.log('handleFacebookSubmit; login');
			if (response.status === 'connected') {
				console.log('handleFacebookSubmit; connected');
				// Logged into your app and Facebook.
			} else {
				console.log('handleFacebookSubmit; unable to connect');
				// The person is not logged into this app or we are unable to tell.
			}
		});

		// this.props.actions
		// 	.signinGoogleUser({
		// 		email: profile.getEmail(),
		// 		id: idToken
		// 	})
		// 	.catch(error => {
		// 		this.setState({ error_text: error.message });
		// 		this.setGoogleStatus();
		// 	});
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Error text={this.state.error_text} />

				<Button
					className={classNames(classes.button, classes.facebookButton)}
					variant="raised"
					onClick={this.handleFacebookSubmit}
				>
					{this.state.facebook_auth ? <span>Continue with Facebook</span> : <span>Log in with Facebook</span>}
					<Icon name="facebook" css={classNames(classes.svg, classes.facebookSvg)} />
				</Button>
			</Fragment>
		);
	}
}

LoginFacebook.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(Styles), connect(null, mapDispatchToProps))(LoginFacebook);
