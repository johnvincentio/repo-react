//

import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import * as actions from '../../redux/actions/';

import Error from '../tools/Error';

import { Styles, Nav } from './RegisterStyles';

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	onSubmit = e => {
		e.preventDefault();

		if (this.validate()) {
			return;
		}

		this.props.actions
			.registerUser({
				email: this.state.email_field,
				password: this.state.password_field
			})
			.then(() => {
				// console.log('LoginForm::onSuccess');
				this.props.history.push('/join/request-confirmation');
			})
			.catch(error => {
				// console.log('LoginForm::onFailure');
				this.setState({ error_text: error.message });
				this.props.actions.signoutUser(error.message);
			});
	};

	init = () => {
		this.state = {
			email_field: '',
			email_error: '',
			password_field: '',
			password_error: '',
			confirm_field: '',
			confirm_error: '',
			error_text: null
		};
	};

	change = e => {
		this.setState({
			[`${[e.target.name]}_field`]: e.target.value,
			[`${[e.target.name]}_error`]: '',
			error_text: null
		});
	};

	validate = () => {
		// console.log('>>> RegisterForm::validate');
		let isError = false;
		const errors = {
			email_error: '',
			password_error: '',
			confirm_error: '',
			error_text: null
		};
		if (this.state.email_field.length < 5) {
			isError = true;
			errors.email_error = 'Email address must be longer than 5 characters';
		}

		if (this.state.password_field !== this.state.confirm_field) {
			isError = true;
			errors.password_error = 'Passwords must be the same';
			errors.confirm_error = errors.password_error;
		}
		if (this.state.password_field.length < 6) {
			isError = true;
			errors.password_error = 'Password must be longer than 6 charaters';
		}
		if (this.state.confirm_field.length < 6) {
			isError = true;
			errors.confirm_error = 'Confirm Password must be longer than 6 charaters';
		}

		// console.log('isError ', isError);
		this.setState({
			...this.state,
			...errors
		});
		// console.log('<<< RegisterForm::validate; isError ', isError);
		return isError;
	};

	isError = field => {
		const value = this.state[`${field}_error`];
		return value.length > 0;
	};

	render() {
		// console.log('RegisterForm::render(); state ', this.state);
		const { classes } = this.props;
		const errorEmail = this.isError('email');
		const errorPassword = this.isError('password');
		const errorConfirm = this.isError('confirm');

		return (
			<form className={classes.form} onSubmit={this.onSubmit}>
				<Error text={this.state.error_text} />

				<fieldset name="contact-info">
					<TextField
						type="email"
						autoFocus
						error={errorEmail}
						name="email"
						placeholder="Email Address"
						label="Email Address"
						value={this.state.email_field}
						onChange={e => this.change(e)}
						margin="dense"
						className={classes.FormControl}
						helperText={this.state.email_error}
						autoComplete="email"
						itemProp="email"
						itemScope
						itemType="http://schema.org/Person"
					/>
					<br />

					<TextField
						type="password"
						error={errorPassword}
						name="password"
						placeholder="Password"
						label="Password"
						value={this.state.password_field}
						onChange={e => this.change(e)}
						margin="dense"
						className={classes.FormControl}
						helperText={this.state.password_error}
						autoComplete="new-password"
						itemProp="accessCode"
						itemScope
						itemType="http://schema.org/Thing"
					/>
					<br />

					<TextField
						type="password"
						error={errorConfirm}
						name="confirm"
						placeholder="Confirm Password"
						label="Confirm Password"
						value={this.state.confirm_field}
						onChange={e => this.change(e)}
						margin="dense"
						className={classes.FormControl}
						helperText={this.state.confirm_error}
						autoComplete="new-password"
						itemProp="accessCode"
						itemScope
						itemType="http://schema.org/Thing"
					/>
				</fieldset>

				<Nav>
					<p>By creating an account, you agree to the</p>
					<p>
						<a href="#terms-of-service">Terms of Service</a> and<a href="#privacy-policy">Privacy Policy</a>
					</p>
				</Nav>

				<Button
					className={classNames(classes.button, classes.submitButton)}
					color="primary"
					variant="raised"
					type="submit"
				>
					Create Account
				</Button>
				{/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
			</form>
		);
	}
}

RegisterForm.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	actions: PropTypes.shape({
		registerUser: PropTypes.func.isRequired,
		signoutUser: PropTypes.func.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default withRouter(
	compose(withStyles(Styles, { withTheme: true }), connect(null, mapDispatchToProps))(RegisterForm)
);
