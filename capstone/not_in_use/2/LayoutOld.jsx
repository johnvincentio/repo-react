//

import React, { Component } from 'react';
import withStyles from 'material-ui/styles/withStyles';

// import ButtonAppBar from './ButtonAppBar';
import ResponsiveDrawer from './ResponsiveDrawer';

const styles = theme => ({
	// root: {
	// 	flexGrow: 1,
	// 	height: 430,
	// 	zIndex: 1,
	// 	overflow: 'hidden',
	// 	position: 'relative',
	// 	display: 'flex',
	// 	width: '100%'
	// },
	// appBar: {
	// 	position: 'absolute',
	// 	marginLeft: drawerWidth,
	// 	[theme.breakpoints.up('md')]: {
	// 		width: `calc(100% - ${drawerWidth}px)`
	// 	}
	// },
	// navIconHide: {
	// 	[theme.breakpoints.up('md')]: {
	// 		display: 'none'
	// 	}
	// },
	// toolbar: theme.mixins.toolbar,
	// drawerPaper: {
	// 	width: drawerWidth,
	// 	[theme.breakpoints.up('md')]: {
	// 		position: 'relative'
	// 	}
	// },
	// content: {
	// 	flexGrow: 1,
	// 	backgroundColor: theme.palette.background.default,
	// 	padding: theme.spacing.unit * 3
	// }
});

class Layout extends Component {
	state = {
		drawer: false,
		drawerItems: {
			about: false,
			academics: false,
			admissions: false,
			'faith-and-life': false
		}
	};

	toggleDrawer = itemId => {
		this.setState(state => ({ drawer: !state.drawer }));
		itemId && this.expandItem(itemId);
	};

	expandItem = itemId => {
		this.setState(prevState => ({
			drawerItems: {
				...prevState.drawerItems,
				[itemId]: !prevState.drawerItems[itemId]
			}
		}));
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.layout}>
				<ResponsiveDrawer
					open={this.state.drawer}
					toggleDrawer={this.toggleDrawer}
					drawerItems={this.state.drawerItems}
					expandItem={this.expandItem}
				/>
				{/* <ButtonAppBar toggleDrawer={this.toggleDrawer} /> */}
				<main className={classes.main}>{this.props.children}</main>
				{/* <Footer /> */}
			</div>
		);
	}
}

export default withStyles(styles)(Layout);
