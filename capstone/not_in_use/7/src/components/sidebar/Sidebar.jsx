//

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	FormControl,
	Input,
	InputLabel,
	InputAdornment,
	IconButton,
	Divider
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import StarBorder from '@material-ui/icons/StarBorder';
import ProjectIcon from '@material-ui/icons/FolderOpen';
import CalendarIcon from '@material-ui/icons/Event';
import LogOutIcon from '@material-ui/icons/ExitToApp';

import * as actions from '../../redux/actions/';
import { goalsType } from '../../types';

import GoalsIcon from './GoalsIcon';

import TasksList from './TasksList';
import StatusList from './StatusList';
import TagsList from './TagsList';

import SidebarStyles from './SidebarStyles';

class Sidebar extends React.Component {
	state = { open: true, search: '' };

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	handleSearchChange = e => {
		this.setState({ search: e.target.value });
	};

	handleKeyPressed = event => {
		// console.log('Sidebar::handleKeyPressed, event ', event);
		// console.log('event.keyCode ', event.keyCode);
		if (event.keyCode === 13) {
			this.handleSubmit();
		}
	};
	handleSubmit = () => {
		this.props.actions.searchUserData(this.state.search);
	};

	render() {
		// console.log('Sidebar::render; props ', this.props);
		const { classes, location } = this.props;
		// console.log('location ', location);
		const pathname = this.props.location && this.props.location.pathname ? this.props.location.pathname : '';
		// console.log('pathname ', pathname);
		return (
			<div className={classes.root}>
				<List>
					<ListItem className={classes.search}>
						<FormControl className={classes.formControl}>
							<InputLabel
								formcontrolclasses={{
									focused: classes.inputLabelFocused
								}}
								htmlFor="search"
							>
								Search
							</InputLabel>

							<Input
								id="search"
								variant="text"
								value={this.state.search}
								onChange={this.handleSearchChange}
								onKeyDown={this.handleKeyPressed}
								tabIndex="0"
								endAdornment={
									<InputAdornment position="start">
										<IconButton onClick={this.handleSubmit}>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</ListItem>

					<ListItem button component={Link} to="/starred">
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText inset primary="Starred" />
					</ListItem>

					<ListItem button component={Link} to="/calendar">
						<ListItemIcon>
							<CalendarIcon />
						</ListItemIcon>
						<ListItemText inset primary="Calendar" />
					</ListItem>
					<Divider />

					<TasksList />
					<StatusList />
					<TagsList />

					<ListItem button component={Link} to="/goals">
						<ListItemIcon>
							<GoalsIcon />
						</ListItemIcon>
						<ListItemText inset primary="Goals" />
					</ListItem>

					<ListItem button component={Link} to="/projects">
						<ListItemIcon>
							<ProjectIcon />
						</ListItemIcon>
						<ListItemText inset primary="Projects" />
					</ListItem>

					<ListItem button component={Link} to="/signout">
						<ListItemIcon>
							<LogOutIcon />
						</ListItemIcon>
						<ListItemText inset primary="Logout" />
					</ListItem>
				</List>
			</div>
		);
	}
}

Sidebar.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		searchUserData: PropTypes.func.isRequired
	}).isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	goals: state.user.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

// export default compose(withStyles(SidebarStyles), connect(mapStateToProps, mapDispatchToProps))(Sidebar);

export default withRouter(compose(withStyles(SidebarStyles), connect(mapStateToProps, mapDispatchToProps))(Sidebar));

/*
<NavLink to="/starred" className={classes.selected} activeClassName="active">
<ListItem className={classes.selected} button>
	<ListItemIcon className={classes.selected}>
		<StarBorder />
	</ListItemIcon>
	<ListItemText className={classes.selected} inset primary="Starred" />
</ListItem>
</NavLink>
*/
