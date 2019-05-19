import React from 'react';
// import { withRouter, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

// function handleClick(event) {
// 	event.preventDefault();
// 	console.log('SimpleBreadcrumbs::handleClick');
// }

class AppBreadCrumbs extends React.Component {
	selectFolder = (e, id) => {
		e.preventDefault();
		console.log('AppBreadCrumbs::selectFolder; id ', id);
	};

	render() {
		console.log('AppBreadCrumbs::render(); props ', this.props);
		// const classes = useStyles();
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper elevation={0} className={classes.paper}>
					<Breadcrumbs aria-label="Breadcrumb">
						<Link color="inherit" href="/" onClick={event => this.selectFolder(event, 1)}>
							Material-UI
						</Link>
						<Link color="inherit" href="/getting-started/installation/" onClick={event => this.selectFolder(event, 1)}>
							Core
						</Link>
						<Typography color="textPrimary">Breadcrumb</Typography>
					</Breadcrumbs>
				</Paper>
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
				</Paper> */}
			</div>
		);
	}
}

AppBreadCrumbs.propTypes = {
	// widgets: widgetsType.isRequired,
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	folders: PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
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
