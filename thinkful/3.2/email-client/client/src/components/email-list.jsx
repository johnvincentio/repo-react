//

import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './email-list.scss';

export function EmailList(props) {
	// console.log('EmailList; props ', props);
	const emails = props.emailList.map(email => (
		<li className="email-list-email" key={email.id}>
			<div className="email-list-email-from">{email.from}</div>
			<Link to={`/${props.folderId}/${email.id}`}>
				<div className="email-list-email-title">{email.title}</div>
			</Link>
		</li>
	));

	return (
		<div className="folder">
			<h2>{props.folderName}</h2>
			<ul className="email-list">{emails}</ul>
		</div>
	);
}

EmailList.propTypes = {
	folderName: PropTypes.string.isRequired,
	folderId: PropTypes.string.isRequired,
	emailList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			from: PropTypes.string.isRequired,
			to: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired
		}).isRequired
	).isRequired
};

const mapStateToProps = (state, props) => {
	// console.log('EmailList; mapStateToProps; state ', state, ' props ', props);
	const { folderId } = props.match.params;
	const folder = state[folderId];
	return {
		folderId,
		folderName: folder.name,
		emailList: Object.keys(folder.emails).map(emailId => folder.emails[emailId])
	};
};

export default connect(mapStateToProps)(EmailList);
