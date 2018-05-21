//

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import {
	Dialog,
	TextField,
	Select,
	Button,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem
} from '@material-ui/core';

import * as statusUtilities from '../../utilities/statusUtilities';

import * as actions from '../../redux/actions';
import { projectType } from '../../types';

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

class ProjectDialog extends React.Component {
	state = { goalId: this.props.goalId, ...this.props.project, errorTitle: false, open: true };

	closeDialog = () => {
		// console.log('ProjectDialog::closeDialog');
		this.setState({
			open: false
		});
		this.props.close();
	};

	handleSubmit = () => {
		// console.log('ProjectDialog::handleSubmit');
		if (this.state.title.length < 1) {
			this.setState({ errorTitle: true });
			return;
		}
		// this.setState({ errorTitle: false });

		// console.log('state ', this.state);
		const { goalId, projectid, title, description, status } = this.state;
		if (projectid <= 0) {
			this.props.actions.addProject(this.props.goalId, this.state);
		} else {
			const update = { title, description, status };
			this.props.actions.updateProject(goalId, projectid, update);
		}
		this.closeDialog();
	};

	handleCancel = () => {
		// console.log('ProjectDialog::handleCancel');
		this.closeDialog();
	};

	handleChange = name => ({ target: { value } }) => {
		// console.log('ProjectDialog::handleChange; name ', name, ' value ', value);
		this.setState({
			[name]: value
		});
	};

	render() {
		// console.log('ProjectDialog::render');
		const { title, description, status, errorTitle } = this.state;
		const { classes } = this.props;

		const statusOptions = statusUtilities.getStatusOptions();

		return (
			<Dialog open={this.state.open} onClose={this.closeDialog}>
				<DialogTitle>{this.state.projectid > 0 ? 'Edit Project' : 'Add Project'}</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill out the form below.</DialogContentText>
					<form>
						<TextField
							required
							error={errorTitle}
							label="Title"
							value={title}
							onChange={this.handleChange('title')}
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
							<Button className={classes.button} color="primary" variant="raised" onClick={this.handleCancel}>
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

ProjectDialog.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goalId: PropTypes.number.isRequired,
	project: projectType, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		addProject: PropTypes.func.isRequired,
		updateProject: PropTypes.func.isRequired
	}).isRequired,
	close: PropTypes.func.isRequired
};

ProjectDialog.defaultProps = {
	project: {
		projectid: 0,
		title: '',
		description: '',
		status: 0
	}
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(ProjectDialog);
