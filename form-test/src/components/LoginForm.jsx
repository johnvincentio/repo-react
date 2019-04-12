//

import React from 'react';
// import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
// import { bindActionCreators, compose } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import { TextField, Button, FormControlLabel, Checkbox, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import * as actions from '../../redux/actions';

import Error from './Error';

import { Styles } from './RegisterStyles';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	onSubmit = e => {
		e.preventDefault();

		if (this.validate()) {
			console.log('validated');
		}
	};

	init = () => {
		this.state = {
			email_field: '',
			email_error: '',
			password_field: '',
			password_error: '',
			remember: true,
			error_text: null,
			showPassword: false
		};
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	change = e => {
		// console.log('>>> LoginForm::change(); e ', e);
		// console.log('e.target ', e.target);
		// console.log('e.target.name ', e.target.name);
		// console.log('e.target.value ', e.target.value);
		this.setState({
			[`${[e.target.name]}_field`]: e.target.value,
			[`${[e.target.name]}_error`]: '',
			error_text: null
		});
		// console.log('<<< LoginForm::change()');
	};

	validate = () => {
		// console.log('>>> LoginForm::validate');
		let isError = false;
		const errors = {
			email_error: '',
			password_error: '',
			error_text: null
		};
		if (this.state.email_field.length < 5) {
			isError = true;
			errors.email_error = 'Email address must be longer than 5 characters';
		}

		if (this.state.password_field.length < 6) {
			isError = true;
			errors.password_error = 'Password must be longer than 6 charaters';
		}

		this.setState(prevState => ({
			...prevState.state,
			...errors,
			showPassword: false
		}));
		// console.log('<<< LoginForm::validate; isError ', isError);
		return isError;
	};

	isError = field => {
		const value = this.state[`${field}_error`];
		return value.length > 0;
	};

	handleMouseDownPassword = event => {
		event.preventDefault();
	};

	handleClickShowPassword = () => {
		// this.setState({ showPassword: !this.state.showPassword });
		this.setState(prevState => ({ showPassword: !prevState.showPassword }));
	};

	render() {
		// console.log('>>> LoginForm::render');
		const { classes } = this.props;
		const errorEmail = this.isError('email');
		const errorPassword = this.isError('password');

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
						InputProps={{
							inputProps: {
								'aria-label': 'Email Address',
								'aria-required': 'true'
							}
						}}
					/>
					<br />

					<TextField
						type={this.state.showPassword ? 'text' : 'password'}
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
						InputProps={{
							inputProps: {
								'aria-label': 'Password',
								'aria-required': 'true'
							},
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="Toggle password visibility"
										onClick={this.handleClickShowPassword}
										onMouseDown={this.handleMouseDownPassword}
									>
										{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				</fieldset>

				<FormControlLabel
					control={
						<Checkbox
							checked={this.state.remember}
							onChange={this.handleChange('remember')}
							value="checked"
							color="primary"
							inputProps={{
								'aria-label': 'Remember',
								'aria-required': 'true'
							}}
						/>
					}
					label="Remember Me"
				/>

				<Button
					className={classNames(classes.button, classes.submitButton)}
					color="primary"
					variant="contained"
					type="submit"
				>
					{'Sign In'}
				</Button>

				{/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
			</form>
		);
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	actions: PropTypes.shape({
		signinUser: PropTypes.func.isRequired,
		signoutUser: PropTypes.func.isRequired
	}).isRequired
};

export default withStyles(Styles, { withTheme: true })(LoginForm);
