//

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from 'material-ui/styles';
import { Dialog, TextField, Select, Button } from 'material-ui';
import { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

import * as statusUtilities from '../../utilities/statusUtilities';

import * as actions from '../../actions';
import { goalType } from '../../types';

const styles = () => ({
	FormControl: {
		width: 300
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	button: {
		margin: '5px 5px 5px 20px'
	}
});

class AddGoal extends React.Component {
	state = { ...this.props.goal, errorTitle: false, open: true };

	closeDialog = () => {
		// console.log('AddGoal::closeDialog');
		this.setState({
			open: false
		});
		this.props.close();
	};

	handleSubmit = () => {
		// console.log('AddGoal::handleSubmit');
		if (this.state.title.length < 1) {
			this.setState({ errorTitle: true });
			return;
		}
		// this.setState({ errorTitle: false });

		this.props.actions.addUserGoal(this.state);
		this.closeDialog();
	};

	handleChange = name => ({ target: { value } }) => {
		// console.log('AddGoal::handleChange; name ', name, ' value ', value);
		this.setState({
			[name]: value
		});
	};

	// handleKeyPressed = event => {
	// 	if (event.keyCode === 13) {
	// 		this.handleSubmit();
	// 	}
	// };

	render() {
		// console.log('AddGoal::render');
		const { title, description, status, errorTitle } = this.state;
		const { classes } = this.props;

		const statusOptions = statusUtilities.getStatusOptions();

		return (
			<Dialog open={this.state.open} onClose={this.closeDialog}>
				<DialogTitle>Add Goal</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill out the form below.</DialogContentText>
					<form>
						<TextField
							required
							error={errorTitle}
							label="Title"
							value={title}
							onChange={this.handleChange('title')}
							// onKeyDown={this.handleKeyPressed}
							margin="normal"
							className={classes.FormControl}
						/>
						<br />

						<FormControl className={classes.FormControl}>
							<InputLabel htmlFor="status">Status</InputLabel>
							<Select value={status} onChange={this.handleChange('status')}>
								{statusOptions.map(opt => (
									<MenuItem key={opt.id} value={opt.id}>
										{opt.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<br />
						<TextField
							multiline
							rows="4"
							label="Description"
							value={description}
							onChange={this.handleChange('description')}
							margin="normal"
							className={classes.FormControl}
						/>
						<br />
						<div className={classes.buttons}>
							<Button className={classes.button} color="primary" variant="raised" onClick={this.handleSubmit}>
								Cancel
							</Button>
							<Button className={classes.button} color="primary" variant="raised" onClick={this.handleSubmit}>
								Done
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		);
	}
}

AddGoal.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goal: goalType, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		addUserGoal: PropTypes.func.isRequired
	}).isRequired,
	close: PropTypes.func.isRequired
};

AddGoal.defaultProps = {
	goal: {
		id: 0,
		title: '',
		description: '',
		status: 0
	}
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(AddGoal);
