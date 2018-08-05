//

import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import './single-email.scss';

export function SingleEmail(props) {
	// console.log('SingleEmail; props ', props);
	const { email } = props;
	return (
		<div className="single-email">
			<div className="single-email-headers">
				<h2 className="single-email-title">{email.title}</h2>
				<div className="single-email-from">
					<strong>From: </strong>
					{email.from}
				</div>
				<div className="single-email-to">
					<strong>To: </strong>
					{email.to}
				</div>
			</div>
			<div className="single-email-content">{email.content}</div>
		</div>
	);
}

SingleEmail.propTypes = {
	email: PropTypes.shape({
		id: PropTypes.number.isRequired,
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired
	}).isRequired
};

// const mapStateToProps = (state, props) => state[props.folderId].emails[props.emailId];

const mapStateToProps = (state, props) => {
	// console.log('SingleEmail; mapStateToProps; state ', state, ' props ', props);
	const { folderId, emailId } = props.match.params;
	return {
		email: state[folderId].emails[emailId]
	};
};

export default connect(mapStateToProps)(SingleEmail);
