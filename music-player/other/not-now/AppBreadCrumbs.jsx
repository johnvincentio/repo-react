import React from 'react';
// import { withRouter, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

// import { makeStyles } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import * as actions from '../redux/actions';

import { appTheme } from '../themes/themes';

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		justifyContent: 'center',
// 		flexWrap: 'wrap'
// 	},
// 	paper: {
// 		padding: theme.spacing(1, 2)
// 	}
// }));

const styles = () => ({
	root: {
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	paper: {
		padding: appTheme.spacing(1, 2)
	}
});

class AppBreadCrumbs extends React.Component {
	selectFolder = (e, id) => {
		e.preventDefault();
		this.props.select(id);
		console.log('AppBreadCrumbs::selectFolder; id ', id);
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
		console.log('(1) list ', list);
		const arr = list.reverse();
		console.log('arr ', arr);
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

	render() {
		console.log('AppBreadCrumbs::render(); props ', this.props);
		// const classes = useStyles();
		const { classes, folder } = this.props;
		// this.createList(folder);
		return (
			<div className={classes.root}>
				<Paper elevation={0} className={classes.paper}>
					<Breadcrumbs separator="›" aria-label="Breadcrumb">
						{this.createBreadCrumbList(folder)}
					</Breadcrumbs>
				</Paper>
			</div>
		);
	}
}

AppBreadCrumbs.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	folders: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
	folder: PropTypes.number.isRequired,
	select: PropTypes.func.isRequired
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
)(AppBreadCrumbs);

/*
{/* <Link color="inherit" href="/" onClick={event => this.selectFolder(event, 1)}>
	Material-UI
</Link>
<Link color="inherit" href="/getting-started/installation/" onClick={event => this.selectFolder(event, 1)}>
	Core
</Link>
<Typography color="textPrimary">Breadcrumb</Typography> }

<br />
{/* <Paper elevation={0} className={classes.paper}>
	<Breadcrumbs aria-label="Breadcrumb">
		<Link color="inherit" href="/" onClick={handleClick}>
			Material-UI
		</Link>
		<Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
			Core
		</Link>
		<Link color="textPrimary" href="/components/breadcrumbs/" onClick={handleClick} aria-current="page">
			Breadcrumb
		</Link>
	</Breadcrumbs>
</Paper> }
*/

// return arr.forEach((item, idx) => {
// 	console.log('stage 1');
// 	// if (idx === 0) {
// 	// 	return (
// 	// 		<Link color="inherit" href="/" onClick={event => this.selectFolder(event, item.index)}>
// 	// 			{'Home'}
// 	// 		</Link>
// 	// 	);
// 	// }
// 	return (
// 		<Link color="inherit" href="/" onClick={event => this.selectFolder(event, item.index)}>
// 			{item.name}
// 		</Link>
// 	);
// });

// return list.reverse().forEach((item, idx) => (
// 	<div key={item.index}>
// 		<Link color="inherit" href="/" onClick={event => this.selectFolder(event, item.index)}>
// 			{item.name}
// 		</Link>
// 	</div>
// ));
// return list.reverse().map(item => (
// 	<div key={item.index}>
// 		<Link color="inherit" href="/" onClick={event => this.selectFolder(event, item.index)}>
// 			{item.name}
// 		</Link>
// 	</div>
// ));

// {/*
// 				<ListItem button onClick={event => this.selectFile(event, item.tags.fileIdx)}>
// 					{/* <ListItemIcon>
// 						<GoalsIcon />
// 					</ListItemIcon> */}
// 					<ListItemText inset primary={item.file.replace(/\.[^/.]+$/, '')} secondary={item.tags.artist} />
// 				</ListItem> */}
