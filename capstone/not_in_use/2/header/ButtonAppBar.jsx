import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import HomeIcon from './HomeIcon';

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	iconHover: {
		'&:hover': {
			color: '#FE6B8B'
		}
	}
};

// const styles = theme => ({
// 	root: {
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'flex-end'
// 	},
// 	icon: {
// 		margin: theme.spacing.unit * 2
// 	},
// 	iconHover: {
// 		margin: theme.spacing.unit * 2,
// 		'&:hover': {
// 			color: green[200]
// 		}
// 	}
// });

function ButtonAppBar(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<HomeIcon className={classes.iconHover} />
					<Typography variant="title" color="inherit" className={classes.flex}>
						TaskMuncher
					</Typography>
					<Button color="inherit">Login</Button>
					<Button color="inherit">Two</Button>
					<Button color="inherit">Three</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
