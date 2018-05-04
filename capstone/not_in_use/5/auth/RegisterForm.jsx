//

import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles, TextField, Button } from 'material-ui';

import { Styles, Nav } from './RegisterStyles';

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	onSubmit = e => {
		e.preventDefault();
		// console.log('RegisterForm::onSubmit');
		// this.props.onSubmit(this.state);

		const err = this.validate();
		// console.log('err ', err);

		// // send to server, get the ok.
		// // if error,
		// // Error: Email Address or your Password are invalid.
		// if (!err) {
		// 	this.setState({
		// 		email: '',
		// 		password1: '',
		// 		password2: ''
		// 	});
		// }
	};

	init = () => {
		// console.log('--- RegisterForm::init()');
		this.state = {
			email_field: '',
			email_error: '',
			password_field: '',
			password_error: '',
			confirm_field: '',
			confirm_error: ''
		};
	};

	// handleChange = name => ({ target: { value } }) => {
	// 	console.log('RegisterForm::handleChange; name ', name, ' value ', value);
	// 	// this.props.onChange({ [e.target.name]: e.target.value });
	// 	const jv1 = this.state.fields[name];
	// 	console.log('jv1 ', jv1);
	// 	this.setState({
	// 		[name]: value
	// 	});
	// };

	change = e => {
		// console.log('>>> RegisterForm::change(); e ', e);
		// console.log('e.target ', e.target);
		// console.log('e.target.name ', e.target.name);
		// console.log('e.target.value ', e.target.value);
		this.setState({
			[`${[e.target.name]}_field`]: e.target.value,
			[`${[e.target.name]}_error`]: ''
		});
		// console.log('<<< RegisterForm::change()');
	};

	validate = () => {
		// console.log('>>> RegisterForm::validate');
		let isError = false;
		const errors = {
			email_error: ''
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
		// console.log('>>> RegisterForm::isError; field ', field);
		const value = this.state[`${field}_error`];
		const err = value.length > 0;
		// console.log('<<< RegisterForm::isError; err ', err);
		return err;
	};

	render() {
		// console.log('RegisterForm::render(); state ', this.state);
		const { classes } = this.props;
		const errorEmail = this.isError('email');
		const errorPassword = this.isError('password');
		const errorConfirm = this.isError('confirm');

		return (
			<form className={classes.form} onSubmit={this.onSubmit}>
				<div className="js--error-msg form-error" />
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
						// onChange={this.handleChange('email')}
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
				<pre>{JSON.stringify(this.state, null, 2)}</pre>
			</form>
		);
	}
}

RegisterForm.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(Styles)(RegisterForm);
