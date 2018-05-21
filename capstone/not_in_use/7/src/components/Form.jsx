//

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/*
https://github.com/benawad/basic-react-form/tree/2_material_ui/src

*/

export default class Form extends React.Component {
	state = {
		firstName: '',
		firstNameError: 'first name is an error',
		lastName: '',
		lastNameError: '',
		username: '',
		usernameError: '',
		email: '',
		emailError: '',
		password: '',
		passwordError: ''
	};

	init = () => {
		this.setState({
			firstName: '',
			firstNameError: '',
			lastName: '',
			lastNameError: '',
			username: '',
			usernameError: '',
			email: '',
			emailError: '',
			password: '',
			passwordError: ''
		});
	};

	change = e => {
		console.log('Form::change()');
		this.props.onChange({ [e.target.name]: e.target.value });
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	validate = () => {
		console.log('>>> Form::validate()');
		let isError = false;
		const errors = {
			firstNameError: '',
			lastNameError: '',
			usernameError: '',
			emailError: '',
			passwordError: ''
		};

		if (this.state.username.length < 5) {
			isError = true;
			errors.usernameError = 'Username needs to be atleast 5 characters long';
		}

		if (this.state.email.indexOf('@') === -1) {
			isError = true;
			errors.emailError = 'Requires valid email';
		}

		this.setState({
			...this.state,
			...errors
		});

		console.log('<<< Form::validate(); isError ', isError);
		return isError;
	};

	onSubmit = e => {
		console.log('>>> Form::onSubmit()');
		e.preventDefault();
		// this.props.onSubmit(this.state);
		const err = this.validate();
		if (!err) {
			// clear form
			console.log('Form::onSubmit(); clear form');
			this.setState({
				firstName: '',
				firstNameError: '',
				lastName: '',
				lastNameError: '',
				username: '',
				usernameError: '',
				email: '',
				emailError: '',
				password: '',
				passwordError: ''
			});
			this.props.onChange({
				firstName: '',
				lastName: '',
				username: '',
				email: '',
				password: ''
			});
		}
		console.log('isError(this.state.firstNameError) ', this.isError('firstNameError'));
		console.log('isError(this.state.usernameError) ', this.isError('usernameError'));
		console.log('<<< Form::onSubmit()');
	};

	isError = field => {
		console.log('--- Form::isError; field ', field);
		const value = this.state[field];
		console.log('value ', value);
		return value.length > 0;
	};

	/*
{this.state.editTask && (
	<TaskDialog goalId={goalId} projectId={projectId} task={task} close={this.closeEditTaskDialog} />
)}
*/

	render() {
		console.log('Form::render()');
		const jv1 = true;
		const jv2 = false;
		return (
			<form>
				<TextField
					error
					name="firstName"
					placeholder="First name"
					label="First name"
					value={this.state.firstName}
					onChange={e => this.change(e)}
					helperText={this.state.firstNameError}
				/>
				<br />
				<TextField
					autoFocus
					error={jv1}
					name="lastName"
					placeholder="Last Name"
					label="Last Name"
					value={this.state.lastName}
					onChange={e => this.change(e)}
					helperText={this.state.lastNameError}
				/>
				<br />
				<TextField
					// {isError('usernameError') && error}
					// {this.state.usernameError.length && (error)}
					error={jv2}
					name="username"
					placeholder="Username"
					label="Username"
					value={this.state.username}
					onChange={e => this.change(e)}
					helperText={this.state.usernameError}
				/>
				<br />
				<TextField
					name="email"
					placeholder="Email"
					label="Email"
					value={this.state.email}
					onChange={e => this.change(e)}
					helperText={this.state.emailError}
				/>
				<br />
				<TextField
					name="password"
					placeholder="Password"
					label="Password"
					value={this.state.password}
					onChange={e => this.change(e)}
					type="password"
					helperText={this.state.passwordError}
				/>
				<br />
				<Button color="primary" onClick={e => this.onSubmit(e)}>
					Submit
				</Button>
				<pre>{JSON.stringify(this.state, null, 2)}</pre>
			</form>
		);
	}
}
