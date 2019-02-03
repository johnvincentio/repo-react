
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createStream } from '../../redux/actions';

class StreamCreate extends React.Component {

	renderInput = props => {
		console.log('--- renderInput, props ', props);
		const { input, label, meta, htmlFor } = props;
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label htmlFor={htmlFor}>
					{label}
					<input id={htmlFor} {...input} autoComplete="off" />
				</label>
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = formValues => {
		console.log('StreamCreate::onSubmit')
		this.props.createStream(formValues);
	};

	renderError = ({ error, touched }) => {
		console.log('renderError, error ', error, ' touched ', touched)
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
		return null;
	}

	render() {
		console.log('****** StreamCreate; props ', this.props);
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter Title" htmlFor="title" />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter Description"
					htmlFor="description"
				/>
				<button type="submit" className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	console.log('validate');
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}

	return errors;
};

StreamCreate.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	createStream: PropTypes.func.isRequired
};

const formWrapped = reduxForm({
	form: 'streamForm',
	validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);

/*
function mapStateToProps(state) {
	// console.log('memberMain::mapStateToProps, state ', state);
	return { goals: state.user.goals };
}

export default compose(
	withStyles(MemberMainStyles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(MemberMain);
*/
