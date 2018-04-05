//

import React, { Component, Fragment } from 'react';

import { Dialog, Button } from 'material-ui';
import { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Tooltip from 'material-ui/Tooltip';

// import { AddIcon } from 'material-ui-icons';
import AddIcon from 'material-ui-icons/Add';
// import Form from './Form';

class AddGoal extends Component {
	state = {
		open: false
	};

	handleToggle = () => {
		this.setState({
			open: !this.state.open
		});
	};

	handleFormSubmit = exercise => {
		this.handleToggle();

		this.props.onCreate(exercise);
	};

	render() {
		console.log('AddGoal::render()');
		const { open } = this.state;
		// { muscles } = this.props;

		return (
			<Fragment>
				{/* <Tooltip className={classes.left} title="Add Goal" placement="bottom-start" enterDelay={300}>
					<IconButton onClick={this.handleAddGoalToggle}>
						<AddIcon color="inherit" />
					</IconButton>
				</Tooltip> */}
				<Tooltip title="Add Goal" placement="bottom-start" enterDelay={300}>
					<Button variant="fab" color="primary" aria-label="add" onClick={this.handleToggle} mini>
						<AddIcon color="inherit" />
					</Button>
				</Tooltip>

				<Dialog open={open} onClose={this.handleToggle}>
					<DialogTitle>Create a New Exercise</DialogTitle>
					<DialogContent>
						<DialogContentText>Please fill out the form below.</DialogContentText>
						{/* <Form muscles={muscles} onSubmit={this.handleFormSubmit} /> */}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

export default AddGoal;
