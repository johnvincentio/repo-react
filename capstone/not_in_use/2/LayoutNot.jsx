import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';

import NestedList from './NestedList';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 430,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	flex: {
		flex: 1,
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	// appBar: {
	// 	position: 'absolute',
	// 	marginLeft: drawerWidth,
	// 	[theme.breakpoints.up('md')]: {
	// 		width: `calc(100% - ${drawerWidth}px)`
	// 	}
	// },
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	}
});

class Layout extends React.Component {
	state = {
		mobileOpen: false
	};

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	render() {
		const { classes, theme } = this.props;

		const drawer = <NestedList />;

		// const drawer = (
		// 	<div>
		// 		<div className={classes.toolbar} />
		// 		<Divider />
		// 		<List>{mailFolderListItems}</List>
		// 		<Divider />
		// 		<List>{otherMailFolderListItems}</List>
		// 	</div>
		// );

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" className={classes.flex} noWrap>
							TaskMuncher
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.props.children}
				</main>
				{/* <main className={classes.content}>
					<div className={classes.toolbar} />
					<Typography noWrap>You think water moves fast? You should see ice.</Typography>
				</main> */}
			</div>
		);
	}
}
// <main className={classes.main}>{this.props.children}</main>

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Layout);
