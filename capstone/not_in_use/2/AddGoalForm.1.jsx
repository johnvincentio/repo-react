//
/*
For those who happen across this issue by googling this error message :)

This error occurs when value turns out to be undefined at some point. Things to try:

double-check that you're initializing state for this value
if you're using redux, double-check that the newly selected value is making the full round trip (this was the problem I had).
*/

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from 'material-ui/styles';

import { TextField, Select, Button } from 'material-ui';
import { FormControl, FormHelperText } from 'material-ui/Form';
// import { InputLabel } from 'material-ui/Input';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

import * as statusUtilities from '../../utilities/statusUtilities';

import * as actions from '../../actions';
import { goalType } from '../../types';

const styles = theme => ({
	FormControl: {
		width: 300
	}
});

class AddGoalForm extends React.Component {
	state = { ...this.props.goal, errorTitle: false };

	handleChange = name => ({ target: { value } }) => {
		// console.log('handleChange; name ', name, ' value ', value);
		this.setState({
			[name]: value
		});
	};

	handleSubmit = () => {
		// console.log('AddGoalForm::handleSubmit');
		if (this.state.title.length < 1) {
			this.setState({ errorTitle: true });
			return;
		}
		this.setState({ errorTitle: false });
		// console.log('adding the goal');
		this.props.onSubmit(this.state);
	};

	render() {
		const { title, description, status, errorTitle } = this.state;
		const { classes, goal } = this.props;

		const statusOptions = statusUtilities.getStatusOptions();

		return (
			<form noValidate>
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
				<Button color="primary" variant="raised" onClick={this.handleSubmit}>
					{goal.id === 0 ? 'Add' : 'Edit'}
				</Button>
			</form>
		);
	}
}

AddGoalForm.propTypes = {
	goal: goalType, // eslint-disable-line react/no-typos
	onSubmit: PropTypes.func.isRequired
};

AddGoalForm.defaultProps = {
	goal: {
		id: 0,
		title: '',
		description: '',
		status: 0
	}
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
	grid: state.gridReducer.grid
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(AddGoalForm);
