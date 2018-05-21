//

import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import classnames from 'classnames';

import * as actions from '../../redux/actions/';

import Outer from '../home/Outer';
import Inner from '../home/Inner';
import Error from '../tools/Error';

import { Styles, Title, Nav } from '../register/RegisterStyles';

class PasswordReset extends React.Component {
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
			.resetPassword({
				email: this.state.email_field
			})
			.then(() => {
				this.props.history.push('/reset-password-confirmation');
			})
			.catch(error => {
				this.setState({ error_text: error.message });
			});
	};

	init = () => {
		this.state = {
			email_field: '',
			email_error: '',
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
		let isError = false;
		const errors = {
			email_error: '',
			error_text: null
		};

		if (this.state.email_field.length < 5) {
			isError = true;
			errors.email_error = 'Email address must be longer than 5 characters';
		}

		this.setState({
			...this.state,
			...errors
		});
		return isError;
	};

	isError = field => {
		const value = this.state[`${field}_error`];
		return value.length > 0;
	};

	render() {
		const { classes } = this.props;
		const errorEmail = this.isError('email');
		return (
			<Outer>
				<Inner>
					<Title>Reset Your Password</Title>
					<Nav>
						<p>Please enter your email address.</p>
						<p>We&#39;ll email you a link to reset your password.</p>
					</Nav>
					<form className={classes.form} onSubmit={this.onSubmit}>
						<Error text={this.state.error_text} />

						<fieldset name="contact-info">
							<TextField
								className={classes.FormControl}
								type="email"
								name="email"
								placeholder="Email Address"
								label="Email Address"
								value={this.state.email_field}
								onChange={e => this.change(e)}
								error={errorEmail}
								helperText={this.state.email_error}
								margin="dense"
								autoComplete="email"
								itemProp="email"
								itemScope
								itemType="http://schema.org/Person"
							/>
							<br />
						</fieldset>

						<Button
							className={classnames(classes.button, classes.submitButton)}
							color="primary"
							variant="raised"
							type="submit"
						>
							Continue
						</Button>
						{/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
					</form>
				</Inner>
			</Outer>
		);
	}
}

PasswordReset.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	actions: PropTypes.shape({
		resetPassword: PropTypes.func.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default withRouter(
	compose(withStyles(Styles, { withTheme: true }), connect(null, mapDispatchToProps))(PasswordReset)
);
