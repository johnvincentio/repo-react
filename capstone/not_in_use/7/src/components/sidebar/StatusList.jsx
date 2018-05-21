//

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@material-ui/core';

import StatusIcon from '@material-ui/icons/Timeline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class StatusList extends React.Component {
	state = { open: false };

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	render() {
		return (
			<Fragment>
				<ListItem button onClick={this.handleClick}>
					<ListItemIcon>
						<StatusIcon />
					</ListItemIcon>
					<ListItemText inset primary="Status" />
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button component={Link} to="/status/started">
							<ListItemText inset primary="Started" />
						</ListItem>
						<ListItem button component={Link} to="/status/completed">
							<ListItemText inset primary="Completed" />
						</ListItem>
						<ListItem button component={Link} to="/status/planning">
							<ListItemText inset primary="Planning" />
						</ListItem>
						<ListItem button component={Link} to="/status/waiting">
							<ListItemText inset primary="Waiting" />
						</ListItem>
						<ListItem button component={Link} to="/status/hold">
							<ListItemText inset primary="Hold" />
						</ListItem>
						<ListItem button component={Link} to="/status/someday">
							<ListItemText inset primary="Someday" />
						</ListItem>
						<Divider />
					</List>
				</Collapse>
			</Fragment>
		);
	}
}

export default StatusList;
