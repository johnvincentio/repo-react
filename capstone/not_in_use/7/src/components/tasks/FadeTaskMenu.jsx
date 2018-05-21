//

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { IconButton, Fade, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/ModeEdit';
import CloneIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
	smallIcon: {
		width: 24,
		height: 24
	},
	menuItem: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& $primary, & $icon': {
				color: theme.palette.common.white
			}
		}
	},
	primary: {},
	icon: {}
});

class FadeTaskMenu extends React.Component {
	state = {
		anchorEl: null
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleEdit = () => {
		console.log('FadeTaskMenu::handleEdit');
		this.props.edit();
		this.setState({ anchorEl: null });
	};

	handleClone = () => {
		console.log('FadeTaskMenu::handleClone');
		this.props.clone();
		this.setState({ anchorEl: null });
	};

	handleDelete = () => {
		console.log('FadeTaskMenu::handleDelete');
		this.props.delete();
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		const { anchorEl } = this.state;

		return (
			<div>
				{/* <Button aria-owns={anchorEl ? 'fade-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
					Open with fade transition
				</Button> */}
				<IconButton
					className={classes.smallIcon}
					aria-label="Task Menu"
					aria-owns={anchorEl ? 'fade-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
					// onClick={() => this.onClickSelectTask(goalId, projectId, task)}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="fade-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					TransitionComponent={Fade}
				>
					<MenuItem className={classes.menuItem} onClick={this.handleEdit}>
						<ListItemIcon className={classes.icon}>
							<EditIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Edit Task" />
					</MenuItem>
					<MenuItem className={classes.menuItem} onClick={this.handleClone}>
						<ListItemIcon className={classes.icon}>
							<CloneIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Clone Task" />
					</MenuItem>
					<MenuItem className={classes.menuItem} onClick={this.handleDelete}>
						<ListItemIcon className={classes.icon}>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Delete Task" />
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

FadeTaskMenu.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	edit: PropTypes.func.isRequired,
	clone: PropTypes.func.isRequired,
	delete: PropTypes.func.isRequired
};

export default withStyles(styles)(FadeTaskMenu);
