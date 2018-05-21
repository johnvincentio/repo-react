//

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from '@material-ui/icons/Dashboard';

import LogoIcon from '../tools/LogoIcon';

import Icon from '../tools/Icon';

import HomeLayoutStyles from './HomeLayoutStyles';

class HomeLayout extends React.Component {
	state = {
		mobileOpen: false
	};

	handleDrawerToggle = () => {
		// console.log('HomeLayout::handleDrawerToggle');
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	render() {
		console.log('HomeLayout::render; this.props ', this.props);
		const { classes, authenticated } = this.props;
		console.log('authenticated ', authenticated);
		const drawer = (
			<Fragment>
				<List>
					{!authenticated && (
						<ListItem button component={Link} to="/join">
							<ListItemIcon>
								<Icon name="register" css={classes.drawerIcon} />
							</ListItemIcon>
							<ListItemText inset primary="Join" />
						</ListItem>
					)}

					{!authenticated && (
						<ListItem button component={Link} to="/signin">
							<ListItemIcon>
								<Icon name="login" css={classes.drawerIcon} />
							</ListItemIcon>
							<ListItemText inset primary="Sign In" />
						</ListItem>
					)}

					{authenticated && (
						<ListItem button component={Link} to="/dashboard">
							<ListItemIcon>
								<Dashboard className={classes.drawerIcon} />
							</ListItemIcon>
							<ListItemText inset primary="Dashboard" />
						</ListItem>
					)}

					{authenticated && (
						<ListItem button component={Link} to="/signout">
							<ListItemIcon>
								<Icon name="exit" css={classes.drawerIcon} />
							</ListItemIcon>
							<ListItemText inset primary="Signout" />
						</ListItem>
					)}
				</List>
			</Fragment>
		);

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						{/* <Icon name="burger" css={classes.logo} /> */}

						<Typography variant="title" color="inherit" component={Link} to="/" className={classes.title} noWrap>
							<LogoIcon />
							TaskMuncher
						</Typography>

						<Hidden xsDown>
							{!authenticated && (
								<Button color="inherit" component={Link} to="/join">
									Join
								</Button>
							)}

							{!authenticated && (
								<Button color="inherit" component={Link} to="/signin">
									Sign in
								</Button>
							)}

							{authenticated && (
								<Button color="inherit" component={Link} to="/dashboard">
									Dashboard
								</Button>
							)}

							{authenticated && (
								<Button color="inherit" component={Link} to="/signout">
									Sign Out
								</Button>
							)}
						</Hidden>

						<Hidden smUp>
							<div className={classes.right}>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={this.handleDrawerToggle}
									className={classes.navIconHide}
								>
									<MenuIcon />
								</IconButton>
							</div>
						</Hidden>
					</Toolbar>
				</AppBar>

				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor="left"
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>

				{this.props.children}
			</div>
		);
	}
}

HomeLayout.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	console.log('mapStateToProps; state ', state);
	return {
		authenticated: state.user.authenticated
	};
}

export default compose(withStyles(HomeLayoutStyles, { withTheme: true }), connect(mapStateToProps))(HomeLayout);
