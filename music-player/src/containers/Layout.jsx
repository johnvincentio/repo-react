//

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';

import LogoIcon from '../components/tools/LogoIcon';
import Icon from '../components/tools/Icon';

import LayoutStyles from './LayoutStyles';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import Header from '../header/Header';

// import Error from '../tools/Error';

// import * as actions from '../../redux/actions';

class Layout extends React.Component {
	state = {
		mobileOpen: false
	};

	handleDrawerToggle = () => {
		// console.log('HomeLayout::handleDrawerToggle');
		// this.setState({ mobileOpen: !this.state.mobileOpen });
		this.setState(prevState => ({ mobileOpen: !prevState.mobileOpen }));
	};

	render() {
		console.log('Layout; props ', this.props);
		const { classes, main } = this.props;
		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit" component={Link} to="/" className={classes.title} noWrap>
							<LogoIcon />
							MyMusic
						</Typography>

						<Hidden xsDown>
							<Button color="inherit" component={Link} to="/folders">
								Folders
							</Button>

							<Button color="inherit" component={Link} to="/albums">
								Albums
							</Button>

							<Button color="inherit" component={Link} to="/artists">
								Artists
							</Button>

							<Button color="inherit" component={Link} to="/favorites">
								Favorites
							</Button>
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
						<List>
							<ListItem button component={Link} to="/folders">
								<ListItemIcon>
									<Icon name="register" css={classes.drawerIcon} />
								</ListItemIcon>
								<ListItemText inset primary="Folders" />
							</ListItem>
							<ListItem button component={Link} to="/albums">
								<ListItemText inset primary="Albums" />
							</ListItem>
							<ListItem button component={Link} to="/artists">
								<ListItemText inset primary="Artists" />
							</ListItem>
							<ListItem button component={Link} to="/favorites">
								<ListItemText inset primary="Favorites" />
							</ListItem>
						</List>
					</Drawer>
				</Hidden>

				{this.props.children}
			</div>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
	main: PropTypes.bool.isRequired,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
	// actions: PropTypes.shape({
	// 	searchWidgets: PropTypes.func.isRequired
	// }).isRequired
};

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch)
// });

// export default connect(
// 	null,
// 	mapDispatchToProps
// )(Layout);

export default compose(withStyles(LayoutStyles, { withTheme: true }))(Layout);

/*
		return (
			<Fragment>
				<div>
					say hello
					{this.drawer()}
					{ <Header /> }
					{ {main && (
						<section className="layout-toolbar">
							<Create />
							<Search onSubmit={this.onSearchSubmit} />
						</section>
					)} }
					{ <Error text={this.state.error_text} />}
					<main>{this.props.children}</main>
				</div>
			</Fragment>
		);
*/
