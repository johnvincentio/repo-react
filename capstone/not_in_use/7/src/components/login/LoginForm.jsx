//

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';

import * as actions from '../../redux/actions/';

import Error from '../tools/Error';

import { Styles, Nav } from '../register/RegisterStyles';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	componentWillMount() {
		const email = localStorage.getItem('user');
		this.setState({ email_field: email });
	}

	onSubmit = e => {
		e.preventDefault();

		if (this.validate()) {
			return;
		}

		this.props.actions
			.signinUser({
				email: this.state.email_field,
				password: this.state.password_field,
				remember: this.state.remember
			})
			.then(() => {
				if (this.state.remember) {
					localStorage.setItem('user', this.state.email_field);
				} else {
					localStorage.removeItem('user');
				}
			})
			.catch(error => {
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
			remember: true,
			error_text: null
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

		// console.log('isError ', isError);
		this.setState({
			...this.state,
			...errors
		});
		// console.log('<<< LoginForm::validate; isError ', isError);
		return isError;
	};

	isError = field => {
		const value = this.state[`${field}_error`];
		return value.length > 0;
	};

	render() {
		console.log('>>> LoginForm::render');
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

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(Styles, { withTheme: true }), connect(null, mapDispatchToProps))(LoginForm);
