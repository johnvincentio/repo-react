//

import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './sidebar.scss';

export function Sidebar(props) {
	// console.log('Sidebar; props ', props);
	const folders = props.folderList.map(folder => (
		<li key={folder.id} className="folder-menu-list-item">
			<Link to={`/${folder.id}`}>{folder.name}</Link>
		</li>
	));

	return (
		<div className="sidebar sidebar-left">
			<nav className="folder-menu">
				<ul className="folder-menu-list">{folders}</ul>
			</nav>
		</div>
	);
}

Sidebar.propTypes = {
	folderList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired
	).isRequired
};

const mapStateToProps = state => ({
	folderList: Object.keys(state).map(folderId => state[folderId])
});

export default connect(mapStateToProps)(Sidebar);
