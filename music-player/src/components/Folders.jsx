//

import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';

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

import AppBreadCrumbs from './AppBreadCrumbs';

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		justifyContent: 'center',
// 		flexWrap: 'wrap'
// 	},
// }));

class Folders extends React.Component {
	state = {
		folder: 1,
		track: null
	};

	componentDidMount() {
		console.log('--- Folders::componentDidMount');
		this.props.actions.getMusicData();
	}

	selectFile = (e, id) => {
		console.log('Folders::selectFile; id ', id);
	};

	selectFolder = (e, id) => {
		console.log('Folders::selectFolder; id ', id);
	};

	renderCurrentFolder() {
		console.log('Folders::renderCurrentFolder(); props ', this.props);
		const root = this.props.folders[0];
		const current = this.props.folders[this.state.folder];
		const dir = current.dir.replace(`${root.dir}/`, '');
		return <div>Current Folder: {dir}</div>;
	}

	renderSubFolders() {
		console.log('Folders::renderSubFolders(); props ', this.props);
		const current = this.props.folders[this.state.folder];
		const { next } = current;
		return next.map(item => {
			const subFolder = this.props.folders[item];
			const dir = subFolder.dir.replace(`${current.dir}/`, '');
			return (
				<div key={subFolder.index}>
					<ListItem button onClick={event => this.selectFolder(event, subFolder.index)}>
						<ListItemText inset primary={dir} />
					</ListItem>
				</div>
			);
		});
	}

	/*
		return next.map(item => {
			const subFolder = this.props.folders[item];
			const dir = subFolder.dir.replace(`${current.dir}/`, '');
			return (
				<div key={subFolder.index}>
					<div>Sub-folder: {dir}</div>
				</div>
			);
		});
*/
	renderCurrentFiles() {
		console.log('Folders::renderCurrentFiles(); props ', this.props);
		const current = this.props.folders[this.state.folder];
		const { mp3 } = current;
		return mp3.map(item => (
			<div key={item.tags.fileIdx}>
				<ListItem button onClick={event => this.selectFile(event, item.tags.fileIdx)}>
					{/* <ListItemIcon>
						<GoalsIcon />
					</ListItemIcon> */}
					<ListItemText inset primary={item.file.replace(/\.[^/.]+$/, '')} secondary={item.tags.artist} />
				</ListItem>
			</div>
		));
	}
	// <ListItem button component={Link} to="/test1">
	/*
			return mp3.map(item => (
			<div key={item.tags.fileIdx}>
				<div>MP3 name {item.file}</div>
			</div>
		));
	*/
	// {/* renderList() {
	// 	console.log('Folders::renderList(); props ', this.props);
	// 	return (<div><hilow/div>)
	// } */}

	render() {
		console.log('Folders::render(); props ', this.props);
		// const classes = useStyles();
		return (
			<Outer>
				<Inner>
					<AppBreadCrumbs />
					<List>
						{this.renderCurrentFolder()}
						{this.renderSubFolders()}
					</List>
					<Button variant="contained" color="primary">
						Hello World
					</Button>
				</Inner>
				<Inner>
					<List>{this.renderCurrentFiles()}</List>
					<Button variant="contained" color="primary">
						Right
					</Button>
				</Inner>
			</Outer>
		);
	}
}

// works
// render() {
// 	console.log('Folders::render(); props ', this.props);
// 	return (
// 		<React.Fragment>
// 			<SimpleBreadcrumbs />
// 			<List>
// 				{this.renderCurrentFolder()}
// 				{this.renderSubFolders()}
// 			</List>
// 			<Button variant="contained" color="primary">
// 				Hello World
// 			</Button>

// 			<List>{this.renderCurrentFiles()}</List>
// 			<Button variant="contained" color="primary">
// 				Right
// 			</Button>
// 		</React.Fragment>
// 	);
// }

// render2() {
// 	console.log('Folders::render(); props ', this.props);
// 	return (
// 		<Outer>
// 			<Inner>
// 				<SimpleBreadcrumbs />
// 				<List>
// 					{this.renderCurrentFolder()}
// 					{this.renderSubFolders()}
// 				</List>
// 				<Button variant="contained" color="primary">
// 					Hello World
// 				</Button>
// 			</Inner>
// 			<Inner>
// 				<List>{this.renderCurrentFiles()}</List>
// 				<Button variant="contained" color="primary">
// 					Right
// 				</Button>
// 			</Inner>
// 		</Outer>
// 	);
// }
// }

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
