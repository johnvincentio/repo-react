//

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';

import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	FormControl,
	Input,
	InputLabel,
	InputAdornment,
	IconButton,
	Divider
} from '@material-ui/core';

// import { treeType, foldersType } from '../types';

import * as actions from '../redux/actions';

import Outer from '../containers/Outer';
import Inner from '../containers/Inner';

class Folders extends React.Component {
	state = {
		folder: 1,
		track: null
	};

	componentDidMount() {
		console.log('--- Folders::componentDidMount');
		this.props.actions.getMusicData();
	}

	renderCurrentFolder() {
		console.log('Folders::renderCurrentFolder(); props ', this.props);
		const current = this.props.folders[this.state.folder];
		// const { mp3, next } = current;
		return <div>Current Folder {current.dir}</div>;
	}

	renderSubFolders() {
		console.log('Folders::renderSubFolders(); props ', this.props);
		const current = this.props.folders[this.state.folder];
		const { next } = current;
		return next.map(item => {
			const subFolder = this.props.folders[item];
			return (
				<div key={subFolder.index}>
					<div>Sub-folder {subFolder.dir}</div>
				</div>
			);
		});
	}

	renderCurrentFiles() {
		console.log('Folders::renderCurrentFiles(); props ', this.props);
		const current = this.props.folders[this.state.folder];
		const { mp3 } = current;
		return mp3.map(item => (
			<div key={item.tags.fileIdx}>
				<div>MP3 name {item.file}</div>
			</div>
		));
	}

	// {/* renderList() {
	// 	console.log('Folders::renderList(); props ', this.props);
	// 	return (<div><hilow/div>)
	// } */}

	render() {
		console.log('Folders::render(); props ', this.props);
		return (
			<Outer>
				<Inner>
					{this.renderCurrentFolder()}
					{this.renderSubFolders()}
					{this.renderCurrentFiles()}
					<Button variant="contained" color="primary">
						Hello World
					</Button>
				</Inner>
			</Outer>
		);
	}
}

Folders.propTypes = {
	// widgets: widgetsType.isRequired,
	folders: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
	actions: PropTypes.shape({
		getMusicData: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps(state) {
	console.log('Folders::mapStateToProps(), state ', state);
	return {
		folders: state.data.folders
	};
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Folders);
