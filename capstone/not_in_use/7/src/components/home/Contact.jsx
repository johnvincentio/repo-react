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

import Outer from './Outer';
import Inner from './Inner';
import Error from '../tools/Error';

import { Styles, Title } from '../register/RegisterStyles';

class Contact extends React.Component {
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
			.contactMessage({
				name: this.state.name_field,
				email: this.state.email_field,
				message: this.state.message_field
			})
			.then(() => {
				console.log('Contact::onSuccess');
				this.props.history.push('/contact-confirmation');
			})
			.catch(error => {
				console.log('Contact::onFailure');
				this.setState({ error_text: error.message });
			});
	};

	init = () => {
		this.state = {
			name_field: 'silly name',
			name_error: '',
			email_field: 'test@johnvincent.io',
			email_error: '',
			message_field: 'say anything',
			message_error: '',
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
		// console.log('>>> Contact::validate');
		let isError = false;
		const errors = {
			name_error: '',
			email_error: '',
			message_error: '',
			error_text: null
		};

		if (this.state.name_field.length < 3) {
			isError = true;
			errors.name_error = 'Name must be longer than 3 characters';
		}
		if (this.state.email_field.length < 5) {
			isError = true;
			errors.email_error = 'Email address must be longer than 5 characters';
		}
		if (this.state.message_field.length < 20 || this.state.message_field.length > 200) {
			isError = true;
			errors.message_error = 'Message must be between 20 and 200 characters';
		}

		// console.log('isError ', isError);
		this.setState({
			...this.state,
			...errors
		});
		// console.log('<<< Contact::validate; isError ', isError);
		return isError;
	};

	isError = field => {
		const value = this.state[`${field}_error`];
		return value.length > 0;
	};

	render() {
		const { classes } = this.props;
		const errorName = this.isError('name');
		const errorEmail = this.isError('email');
		const errorMessage = this.isError('message');
		return (
			<Outer>
				<Inner>
					<Title>Send us a message</Title>
					<form className={classes.form} onSubmit={this.onSubmit}>
						<Error text={this.state.error_text} />

						<fieldset name="contact-info">
							<TextField
								className={classnames(classes.narrow, classes.FormControl)}
								inputProps={{
									maxLength: 40
								}}
								autoFocus
								name="name"
								placeholder="Your name"
								label="Name"
								value={this.state.name_field}
								onChange={e => this.change(e)}
								error={errorName}
								helperText={this.state.name_error}
								margin="normal"
							/>
							<br />

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

							<TextField
								className={classes.FormControl}
								multiline
								rows="4"
								name="message"
								placeholder="Your message"
								label="Message"
								value={this.state.message_field}
								onChange={e => this.change(e)}
								error={errorMessage}
								helperText={this.state.message_error}
								margin="dense"
							/>
							<br />
						</fieldset>

						<Button
							className={classnames(classes.button, classes.submitButton)}
							color="primary"
							variant="raised"
							type="submit"
						>
							Send Message
						</Button>
						{/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
					</form>
				</Inner>
			</Outer>
		);
	}
}

Contact.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	actions: PropTypes.shape({
		contactMessage: PropTypes.func.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default withRouter(compose(withStyles(Styles, { withTheme: true }), connect(null, mapDispatchToProps))(Contact));
