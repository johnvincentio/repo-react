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
import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Styles, Title, Nav } from '../register/RegisterStyles';

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	componentDidMount() {
		const { userid, otherid } = this.props;
		this.props.actions
			.verifyChangePassword({
				registerId: userid,
				otherId: otherid
			})
			.catch(() => {
				this.props.history.push('/change-password-failed');
			});
	}

	onSubmit = e => {
		e.preventDefault();

		if (this.validate()) {
			return;
		}

		this.props.actions
			.verifyChangedPassword({
				password: this.state.password_field,
				registerId: this.props.userid,
				otherId: this.props.otherid
			})
			.then(() => {
				this.props.history.push('/change-password-confirmation-success');
			})
			.catch(error => {
				this.setState({ error_text: error.message });
			});
	};

	init = () => {
		this.state = {
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
		let isError = false;
		const errors = {
			password_error: '',
			confirm_error: '',
			error_text: null
		};

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
		const errorPassword = this.isError('password');
		const errorConfirm = this.isError('confirm');
		return (
			<Outer>
				<Inner>
					<Title>Change Your Password</Title>

					<Nav>
						<p>
							Already know your password?
							<a href="#signin">Sign in here</a>
						</p>
					</Nav>

					<form className={classes.form} onSubmit={this.onSubmit}>
						<Error text={this.state.error_text} />

						<fieldset name="contact-info">
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

						<Button
							className={classNames(classes.button, classes.submitButton)}
							color="primary"
							variant="raised"
							type="submit"
						>
							Change Password
						</Button>
						{/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
					</form>
				</Inner>
			</Outer>
		);
	}
}

ChangePassword.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	userid: PropTypes.string.isRequired,
	otherid: PropTypes.string.isRequired,
	actions: PropTypes.shape({
		verifyChangePassword: PropTypes.func.isRequired,
		verifyChangedPassword: PropTypes.func.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default withRouter(
	compose(withStyles(Styles, { withTheme: true }), connect(null, mapDispatchToProps))(ChangePassword)
);
