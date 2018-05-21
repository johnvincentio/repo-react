//

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import * as actions from '../../redux/actions/';

import HomeLayout from './HomeLayout';

import Home from '../home/Home';
import Privacy from '../home/Privacy';
import TermsOfService from '../home/TermsOfService';

import Contact from '../home/Contact';
import ContactConfirmation from '../home/ContactConfirmation';

import Register from '../register/Register';
import UserRegister from '../register/UserRegister';

import UserRegisterFailed from '../register/UserRegisterFailed';
import UserRegisterConfirmation from '../register/UserRegisterConfirmation';

import RequestConfirmation from '../register/RequestConfirmation';

import PasswordReset from '../reset-password/PasswordReset';
import PasswordResetConfirmation from '../reset-password/PasswordResetConfirmation';
import ChangePassword from '../reset-password/ChangePassword';
import ChangePasswordFailed from '../reset-password/ChangePasswordFailed';
import ChangePasswordConfirmation from '../reset-password/ChangePasswordConfirmation';

import Login from '../login/Login';

// import Empty from '../../toolbox/Empty';

import { matchType } from '../../types';

class HomeMain extends React.Component {
	constructor(props) {
		// eslint-disable-line no-useless-constructor
		super(props);
		console.log('--- HomeMain::constructor ', props);
	}

	render() {
		const { datatype } = this.props;
		const { param, param2 } = this.props.match.params;

		console.log('--- HomeMain::render, datatype ', datatype, ' param ', param, ' param2 ', param2);
		let mainDiv = '';
		switch (datatype) {
			case 'login':
				mainDiv = <Login />;
				break;
			case 'register':
				switch (param) {
					case 'request-confirmation':
						mainDiv = <RequestConfirmation />;
						break;
					default:
						mainDiv = <Register />;
						break;
				}
				break;
			case 'confirmation':
				mainDiv = <UserRegister userid={param} otherid={param2} />;
				break;
			case 'confirmation-success':
				mainDiv = <UserRegisterConfirmation />;
				break;
			case 'confirmation-failed':
				mainDiv = <UserRegisterFailed />;
				break;

			case 'reset-password':
				mainDiv = <PasswordReset />;
				break;
			case 'reset-password-confirmation':
				mainDiv = <PasswordResetConfirmation />;
				break;
			case 'change-password':
				mainDiv = <ChangePassword userid={param} otherid={param2} />;
				break;
			case 'change-password-failed':
				mainDiv = <ChangePasswordFailed />;
				break;
			case 'change-password-confirmation-success':
				mainDiv = <ChangePasswordConfirmation />;
				break;

			case 'privacy':
				mainDiv = <Privacy />;
				break;
			case 'terms':
				mainDiv = <TermsOfService />;
				break;
			case 'contact':
				mainDiv = <Contact />;
				break;
			case 'contact-confirmation':
				mainDiv = <ContactConfirmation />;
				break;

			case 'home':
			default:
				mainDiv = <Home />;
				break;
		}

		return <HomeLayout>{mainDiv}</HomeLayout>;
	}
}

HomeMain.propTypes = {
	datatype: PropTypes.string.isRequired,
	match: matchType.isRequired // eslint-disable-line react/no-typos
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(connect(null, mapDispatchToProps))(HomeMain);
