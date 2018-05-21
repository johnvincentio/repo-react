//

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/ModeEdit';
import CloneIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import LinkIcon from '@material-ui/icons/Link';

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

class FadeProjectMenu extends React.Component {
	state = {
		anchorEl: null
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleLink = () => {
		// console.log('FadeGoalMenu::handleLink');
		const { projectid } = this.props;
		// console.log('id ', id);
		this.props.history.push(`/project/${projectid}`);
		this.handleClose();
	};

	handleEdit = () => {
		// console.log('FadeProjectMenu::handleEdit');
		this.props.edit();
		this.handleClose();
	};

	handleClone = () => {
		// console.log('FadeProjectMenu::handleClone');
		this.props.clone();
		this.handleClose();
	};

	handleDelete = () => {
		// console.log('FadeProjectMenu::handleDelete');
		this.props.delete();
		this.handleClose();
	};

	handleAdd = () => {
		// console.log('FadeProjectMenu::handleAdd');
		this.props.add();
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		const { anchorEl } = this.state;

		return (
			<div>
				<IconButton
					className={classes.smallIcon}
					aria-label="Project Menu"
					aria-owns={anchorEl ? 'fade-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
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
					<MenuItem className={classes.menuItem} onClick={this.handleLink}>
						<ListItemIcon className={classes.icon}>
							<LinkIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Link Project" />
					</MenuItem>
					<MenuItem className={classes.menuItem} onClick={this.handleEdit}>
						<ListItemIcon className={classes.icon}>
							<EditIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Edit Project" />
					</MenuItem>
					<MenuItem className={classes.menuItem} onClick={this.handleClone}>
						<ListItemIcon className={classes.icon}>
							<CloneIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Clone Project" />
					</MenuItem>
					<MenuItem className={classes.menuItem} onClick={this.handleDelete}>
						<ListItemIcon className={classes.icon}>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Delete Project" />
					</MenuItem>
					<MenuItem className={classes.menuItem} onClick={this.handleAdd}>
						<ListItemIcon className={classes.icon}>
							<AddIcon />
						</ListItemIcon>
						<ListItemText classes={{ primary: classes.primary }} inset primary="Add Task" />
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

FadeProjectMenu.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	projectid: PropTypes.number.isRequired,
	edit: PropTypes.func.isRequired,
	clone: PropTypes.func.isRequired,
	delete: PropTypes.func.isRequired,
	add: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default withRouter(withStyles(styles)(FadeProjectMenu));
