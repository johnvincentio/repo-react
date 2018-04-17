//

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

import AddIcon from 'material-ui-icons/Add';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import GoalsIcon from './GoalsIcon';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	}
});

class GoalsList extends React.Component {
	state = { open: true };

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<ListItem button component={Link} to="/goals">
					<ListItemText inset primary="Goals" />
				</ListItem>

				<ListItem button onClick={this.handleClick}>
					<ListItemIcon>
						<GoalsIcon />
					</ListItemIcon>
					<ListItemText inset primary="Goals" />
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button component={Link} to="/add/goal">
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText inset primary="Add" />
						</ListItem>
					</List>
				</Collapse>
			</div>
		);
	}
}

GoalsList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GoalsList);
