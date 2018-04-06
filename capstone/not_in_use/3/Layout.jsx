//

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import GridOnIcon from 'material-ui-icons/GridOn';
import GridOffIcon from 'material-ui-icons/GridOff';
import AddIcon from 'material-ui-icons/Add';

import PersistentDrawer from './PersistentDrawer';

import { AddGoal } from '../../components/editor';

import * as actions from '../../actions';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	},
	mainHeader: {
		display: 'block',
		marginTop: '60px',

		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	left: {
		float: 'left'
	},
	right: {
		float: 'right'
	}
});

class Layout extends React.Component {
	state = { open: false };

	handleDialogToggle = () => {
		// console.log('Layout::handleDialogToggle');
		this.setState({
			open: !this.state.open
		});
	};
	dialogClose = () => {
		// console.log('Layout::dialogClose');
		this.setState({
			open: false
		});
	};

	isDialogOpen = () => this.state.open;

	handleGridToggle = () => {
		this.props.actions.toggleGrid();
	};

	render() {
		const { children, classes, grid, datatype } = this.props;
		const colorButton = this.isDialogOpen() ? 'secondary' : 'primary';
		const addGoal = datatype === 'goals' || datatype === 'goal';
		// console.log('Layout::render; addGoal ', addGoal, ' isDialogOpen() ', this.isDialogOpen());
		return (
			<PersistentDrawer>
				<div className={classes.mainHeader}>
					{addGoal ? (
						<Tooltip title="Add Goal" placement="bottom-start" enterDelay={300}>
							<Button mini variant="fab" color={colorButton} aria-label="add" onClick={this.handleDialogToggle}>
								<AddIcon color="inherit" />
							</Button>
						</Tooltip>
					) : (
						''
					)}
					{grid ? (
						<Tooltip className={classes.right} title="List View" placement="bottom-start" enterDelay={300}>
							<Button mini variant="fab" color="primary" aria-label="list view" onClick={this.handleGridToggle}>
								<GridOnIcon color="inherit" />
							</Button>
						</Tooltip>
					) : (
						<Tooltip className={classes.right} title="Grid View" placement="bottom-start" enterDelay={300}>
							<Button mini variant="fab" color="primary" aria-label="grid view" onClick={this.handleGridToggle}>
								<GridOffIcon color="inherit" />
							</Button>
						</Tooltip>
					)}
				</div>
				{this.isDialogOpen() ? <AddGoal close={this.dialogClose} /> : ''}
				{children}
			</PersistentDrawer>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	actions: PropTypes.shape({
		isGrid: PropTypes.func.isRequired,
		toggleGrid: PropTypes.func.isRequired,
		addUserGoal: PropTypes.func.isRequired,
		commandInitialize: PropTypes.func.isRequired
	}).isRequired,
	grid: PropTypes.bool.isRequired,
	datatype: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	grid: state.gridReducer.grid
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Layout);

// export default withRouter(compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Layout));

/*
propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
  },
  getDefaultProps: function() {
    return {
      children: null // or [] I guess
    };
	},
*/
