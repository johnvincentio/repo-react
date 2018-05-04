//

import React from 'react';

import PropTypes from 'prop-types';

import { withStyles, TextField } from 'material-ui';

import Icon from '../../toolbox/Icon';

import Outer from './Outer';
import Inner from './Inner';

import { Styles } from './RegisterStyles';

/*
<IconButton
	className={classes.smallIcon}
	aria-label="Star Task"
	onClick={() => this.onClickTaskStar(goalId, projectId, task)}
>
	<Star
		className={classnames({
			[classes.starred]: task.starred
		})}
	/>
</IconButton>
*/

class Register extends React.Component {
	state = {
		email: '',
		password1: '',
		password2: '',
		emailError: '',
		password1Error: '',
		password2Error: ''
	};

	handleChange = name => ({ target: { value } }) => {
		console.log('Register::handleChange; name ', name, ' value ', value);
		// this.props.onChange({ [e.target.name]: e.target.value });
		this.setState({
			[name]: value
		});
	};

	validate = () => {
		console.log('>>> Register::validate');
		let isError = false;
		const errors = {};
		if (this.state.email.length < 5) {
			isError = true;
			errors.emailError = 'Email address must be > 5 charaters';
		}
		if (this.state.password1.length < 6) {
			isError = true;
			errors.password1Error = 'Password must be > 6 charaters';
		}
		if (this.state.password2.length < 6) {
			isError = true;
			errors.password2Error = 'Confirm Password must be > 6 charaters';
		}
		console.log('isError ', isError);
		if (isError) {
			this.setState({
				...this.state,
				...errors
			});
		}
		console.log('<<< Register::validate');
	};

	onSubmit = e => {
		e.preventDefault();
		console.log('Register::onSubmit');
		// this.props.onSubmit(this.state);

		const err = this.validate();
		if (!err) {
			this.setState({
				email: '',
				password1: '',
				password2: ''
			});
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<Outer>
				<Inner>
					<h2>Sign Up</h2>

					<nav>
						<p>
							Already have an account?
							<a href="#login">Sign in here</a>
						</p>
					</nav>

					<section>
						<button className="facebook-button">
							<span>
								Log in with Facebook
								<Icon name="facebook" />
							</span>
						</button>
						<button className="google-button">
							<span>
								Log in with Google
								<Icon name="google" />
							</span>
						</button>
					</section>

					<section className="oauth-separator-wrap">
						<span className="oauth-separator-txt">or</span>
					</section>

					{/* <form> */}
					<form onSubmit={this.onSubmit}>
						<div className="js--error-msg form-error" />
						<fieldset name="contact-info">
							<div>
								<div>
									<input
										id="email"
										name="email"
										type="email"
										required
										placeholder="Email Address"
										itemProp="email"
										itemScope
										itemType="http://schema.org/Person"
										value={this.state.email}
										onChange={this.handleChange('email')}
									/>
								</div>

								<div>
									<input
										id="password1"
										name="password1"
										type="password"
										required
										placeholder="Password"
										itemProp="accessCode"
										itemScope
										itemType="http://schema.org/Thing"
										value={this.state.password1}
										onChange={this.handleChange('password1')}
									/>
								</div>

								<div>
									<input
										id="password2"
										name="password2"
										type="password"
										required
										placeholder="Confirm Password"
										itemProp="accessCode"
										itemScope
										itemType="http://schema.org/Thing"
										value={this.state.password2}
										onChange={this.handleChange('password2')}
									/>
								</div>
							</div>
						</fieldset>

						<nav>
							<p>By creating an account, you agree to the</p>
							<p>
								<a href="#terms-of-service">Terms of Service</a> and<a href="#privacy-policy">Privacy Policy</a>
							</p>
						</nav>

						{/* <button className="submit-button" type="submit" onClick={e => this.onSubmit(e)}> */}
						<button className="submit-button" type="submit">
							Create Account
						</button>
					</form>
				</Inner>
			</Outer>
		);
	}
}

Register.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(Styles)(Register);

// export default Register;

// {/* <nav role="navigation">
// 	<p>
// 		Already have an account?
// 		<Button className={props.classes.button} component={Link} to="/signin">
// 			Sign in here
// 		</Button>
// 	</p>
// </nav> */}

// {/* <nav role="navigation">
// 	<p>
// 		Already have an account?
// 		<Button color="secondary" component={Link} to="/signin">
// 			Secondary
// 		</Button>
// 	</p>
// </nav> */}

// {/* <Button color="secondary" component={Link} to="/signin">
// 	Secondary
// </Button> */}

// {/* <nav role="navigation">
// 	<p>
// 		Already have an account?
// 		<a href="/login">Log in here</a>
// 	</p>
// </nav> */}

// <div>
// <TextField
// 	required
// 	id="email"
// 	name="email"
// 	label="Email"
// 	// hintText="Email Address"
// 	value={this.state.email}
// 	errortext={this.state.emailError}
// 	onChange={this.handleChange('email')}
// 	margin="normal"
// 	className={classes.FormControl}
// 	// onBlur={this.isDisabled}
// />
// <TextField
// 	required
// 	name="password1"
// 	label="Password"
// 	value={this.state.password1}
// 	// hintText="Password"
// 	type="password"
// 	errortext={this.state.password1Error}
// 	onChange={this.handleChange('password1')}
// 	className={classes.FormControl}
// 	onBlur={this.isDisabled}
// />
