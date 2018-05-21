import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import LogoIcon from '../tools/LogoIcon';

import Sidebar from '../sidebar/Sidebar';
import { isMdUp } from '../../utilities/utils';

import MemberLayoutStyles from './MemberLayoutStyles';

class MemberLayout extends React.Component {
	state = {
		open: !!isMdUp(),
		anchor: 'left'
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleChangeAnchor = event => {
		this.setState({
			anchor: event.target.value
		});
	};

	render() {
		const { classes, theme } = this.props;
		const { anchor, open } = this.state;

		const drawer = (
			<Drawer
				variant="persistent"
				anchor={anchor}
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={this.handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<Sidebar />
			</Drawer>
		);

		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar
						className={classNames(classes.appBar, {
							[classes.appBarShift]: open,
							[classes[`appBarShift-${anchor}`]]: open
						})}
					>
						<Toolbar disableGutters={!open}>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, open && classes.hide)}
							>
								<MenuIcon />
							</IconButton>

							<Typography variant="title" color="inherit" component={Link} to="/" className={classes.title} noWrap>
								<LogoIcon />
								TaskMuncher
							</Typography>

							<Hidden xsDown>
								<Button color="inherit" component={Link} to="/signout">
									Logout
								</Button>
							</Hidden>
						</Toolbar>
					</AppBar>

					{drawer}

					<main
						className={classNames(classes.content, classes[`content-${anchor}`], {
							[classes.contentShift]: open,
							[classes[`contentShift-${anchor}`]]: open
						})}
					>
						{this.props.children}
						{/* <Typography>PersistentDrawer, after children...</Typography> */}
					</main>
				</div>
			</div>
		);
	}
}

MemberLayout.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	theme: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(MemberLayoutStyles, { withTheme: true })(MemberLayout);
