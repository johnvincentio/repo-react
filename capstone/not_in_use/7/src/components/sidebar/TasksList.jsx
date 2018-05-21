//

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@material-ui/core';

import DoneIcon from '@material-ui/icons/Done';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class TasksList extends React.Component {
	state = { open: false };

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	render() {
		return (
			<Fragment>
				<ListItem button onClick={this.handleClick}>
					<ListItemIcon>
						<DoneIcon />
					</ListItemIcon>
					<ListItemText inset primary="Tasks" />
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button component={Link} to="/tasks/all">
							<ListItemText inset primary="All" />
						</ListItem>
						<ListItem button component={Link} to="/tasks/scheduled">
							<ListItemText inset primary="Scheduled" />
						</ListItem>
						<ListItem button component={Link} to="/tasks/late">
							<ListItemText inset primary="Late" />
						</ListItem>
						<Divider />
					</List>
				</Collapse>
			</Fragment>
		);
	}
}

export default TasksList;
