//

import React from 'react';
// import { withRouter, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

// import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

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

import { appTheme } from '../themes/themes';

const styles = () => ({
	root: {
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	paper: {
		padding: appTheme.spacing(1, 2)
	}
});

class Folders extends React.Component {
	state = {
		folderId: 100,
		trackId: null
	};

	componentDidMount() {
		console.log('--- Folders::componentDidMount');
		this.props.actions.getMusicData();
	}

	selectFile = (e, trackId) => {
		e.preventDefault();
		console.log('Folders::selectFile; trackId ', trackId);
	};

	selectFolder = (e, folderId) => {
		e.preventDefault();
		console.log('Folders::selectFolder; folderId ', folderId);
		this.setState({ folderId, trackId: null });
	};

	createBreadCrumbList(folder) {
		console.log('AppBreadCrumbs::createBreadCrumbList(); props ', this.props);
		const list = [];
		let current = this.props.folders[folder];
		list.push(current);
		while (current.previous !== null) {
			current = this.props.folders[current.previous];
			list.push(current);
		}
		const arr = list.reverse();
		return arr.map(item => (
			<div key={item.index}>
				{item.index === 0 ? (
					<Link color="inherit" href="/" onClick={event => this.selectFolder(event, item.index)}>
						{'Home'}
					</Link>
				) : (
					<Link color="inherit" href="/" onClick={event => this.selectFolder(event, item.index)}>
						{item.name}
					</Link>
				)}
			</div>
		));
	}

	renderCurrentFiles(folderId) {
		console.log('Folders::renderCurrentFiles(); folderId ', folderId, ' props ', this.props);
		const current = this.props.folders[folderId];
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

	renderSubFolders(folderId) {
		console.log('Folders::renderSubFolders(); folderId ', folderId, ' props ', this.props);
		const current = this.props.folders[folderId];
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

	renderCurrentFolder(folderId) {
		console.log('Folders::renderCurrentFolder(); folderId ', folderId, ' props ', this.props);
		const root = this.props.folders[0];
		const current = this.props.folders[folderId];
		const dir = current.dir.replace(`${root.dir}/`, '');
		return <div>Current Folder: {dir}</div>;
	}

	render() {
		console.log('Folders::render(); props ', this.props);
		// const classes = useStyles();
		const { classes } = this.props;
		const { folderId } = this.state;
		return (
			<Outer>
				<Inner>
					<div className={classes.root}>
						<Paper elevation={0} className={classes.paper}>
							<Breadcrumbs separator="›" aria-label="Breadcrumb">
								{this.createBreadCrumbList(folderId)}
							</Breadcrumbs>
						</Paper>
					</div>
					<List>
						{/* {this.renderCurrentFolder(folderId)} */}
						{this.renderSubFolders(folderId)}
					</List>
					<Button variant="contained" color="primary">
						Hello World
					</Button>
				</Inner>
				<Inner>
					<List>{this.renderCurrentFiles(folderId)}</List>
					<Button variant="contained" color="primary">
						Right
					</Button>
				</Inner>
			</Outer>
		);
	}
}

Folders.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Folders);

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

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		justifyContent: 'center',
// 		flexWrap: 'wrap'
// 	},
// }));

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
