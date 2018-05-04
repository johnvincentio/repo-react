//

import React from 'react';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import 'isomorphic-fetch';

import classNames from 'classnames';

import { withStyles, TextField, Button } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

import Error from '../Error';
import { Styles, Nav } from './RegisterStyles';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	onSubmit = e => {
		e.preventDefault();

		const validErr = this.validate();
		console.log('validErr ', validErr);
		if (validErr) {
			return false;
		}

		const url = '/api/auth/login';
		const data = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=utf-8'
			},
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email_field,
				password: this.state.password_field,
				remember: this.state.remember
			})
		};

		fetch(url, data)
			.then(response => {
				console.log('response.ok ', response.ok);
				console.log('response.status ', response.status);
				if ((response.status >= 200 && response.status < 300) || response.status === 400) {
					return response.json();
				}
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			})
			.then(success => {
				console.log('success ', success);
				if (success.message) {
					console.log('message found ', success.message);
					this.setState({ server_error: success.message });
				} else if (success.token) {
					console.log('token found ', success.token);
					localStorage.setItem('token', success.token);
					this.props.history.push(`/starred`);
				}
			})
			.catch(error => {
				console.log('error ', error);
			});

		return false;
	};

	init = () => {
		this.state = {
			email_field: 'jv@johnvincent.io',
			email_error: '',
			password_field: '123456',
			password_error: '',
			remember: true,
			server_error: ''
		};
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked, server_error: '' });
	};

	change = e => {
		// console.log('>>> RegisterForm::change(); e ', e);
		// console.log('e.target ', e.target);
		// console.log('e.target.name ', e.target.name);
		// console.log('e.target.value ', e.target.value);
		this.setState({
			[`${[e.target.name]}_field`]: e.target.value,
			[`${[e.target.name]}_error`]: '',
			server_error: ''
		});
		// console.log('<<< RegisterForm::change()');
	};

	validate = () => {
		// console.log('>>> RegisterForm::validate');
		let isError = false;
		const errors = {
			email_error: '',
			password_error: ''
		};
		if (this.state.email_field.length < 5) {
			isError = true;
			errors.email_error = 'Email address must be longer than 5 characters';
		}

		if (this.state.password_field.length < 6) {
			isError = true;
			errors.password_error = 'Password must be longer than 6 charaters';
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
		const err = value.length > 0;
		return err;
	};

	render() {
		const { classes } = this.props;
		const errorEmail = this.isError('email');
		const errorPassword = this.isError('password');

		return (
			<form className={classes.form} onSubmit={this.onSubmit}>
				<Error text={this.state.server_error} />
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
				</fieldset>

				<FormControlLabel
					control={
						<Checkbox
							checked={this.state.remember}
							onChange={this.handleChange('remember')}
							value="checked"
							color="primary"
						/>
					}
					label="Remember Me"
				/>

				<Button
					className={classNames(classes.button, classes.submitButton)}
					color="primary"
					variant="raised"
					type="submit"
				>
					Sign In
				</Button>

				<Nav>
					<p>
						<a href="#reset-password">Forgot password?</a>
					</p>
				</Nav>
				<pre>{JSON.stringify(this.state, null, 2)}</pre>
			</form>
		);
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default withRouter(withStyles(Styles)(LoginForm));

/*
		fetch(url, data)
			.then(response => {
				console.log('response.ok ', response.ok);
				console.log('response.status ', response.status);
				// console.log('response.text ', response.text());
				console.log('response.json ', response.json());
				if (!response.ok) {
					console.log('response.statusText ', response.statusText);
					console.log('response.json.message ', response.json.message);
					const error = new Error(response.statusText);
					error.response = response;
					throw error;
				}
				return response;
			})
			.then(success => {
				console.log('success ', success);
			})
			.catch(error => {
				console.log('error ', error);
			});
*/

// fetch(url, data)
// 	.then(checkStatus)
// 	.then(response => {
// 		// console.log('response.json() ', response.json());
// 		console.log('response ', response);
// 		return response.json();
// 	})
// 	.then(json => {
// 		console.log('json ', json);
// 	})
// 	.catch(error => {
// 		console.log('error ', error);
// 	});

// fetch(url, data)
// 	.then(response => response.json())
// 	.then(success => {
// 		console.log('success ', success);
// 	})
// 	.catch(error => {
// 		console.log('error ', error);
// 	});

// const url = '/api/goals/all';
// fetch(url)
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data);
// 	})
// 	.catch(err => {
// 		console.log('error; err ', err);
// 	});

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
