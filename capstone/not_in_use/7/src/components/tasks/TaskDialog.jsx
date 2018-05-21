//

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import classnames from 'classnames';

import { WithContext as ReactTags } from 'react-tag-input';

import { withStyles } from '@material-ui/core/styles';

import {
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Select,
	Button,
	FormControl,
	InputLabel,
	MenuItem
} from '@material-ui/core';

import { TaskDateTimePicker } from './';

import * as taskStatusUtilities from '../../utilities/taskStatusUtilities';
import * as taskRepeatUtilities from '../../utilities/taskRepeatUtilities';
import * as tagUtilities from '../../utilities/tagUtilities';
import * as datesUtilities from '../../utilities/datesUtilities';

import * as actions from '../../redux/actions';
import { goalsType, taskType } from '../../types';

import './reacttags.scss';

// const ReactTags = require('react-tag-input').WithOutContext;
/*
  contentContainer: {
    width: '100%',
    maxWidth: '70%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '85%'
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '95%'
    }
	},
*/

const styles = theme => ({
	// root: {
	// 	display: 'flex',
	// 	flexWrap: 'wrap'
	// },
	FormControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		width: '100%'
	},
	narrow: {
		width: '33%'
	},
	midsize: {
		width: '50%'
	},
	tags: {
		marginTop: 2 * theme.spacing.unit
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	button: {
		margin: '5px 5px 5px 20px'
	}
});

class TaskDialog extends React.Component {
	constructor(props) {
		super(props);
		// console.log('>>> TaskDialog::constructor; props ', props);
		// console.log('TaskDialog.defaultProps ', TaskDialog.defaultProps);
		this.state = {
			...TaskDialog.defaultProps.task,
			...this.props.task,
			suggestions: [],
			errorTitle: false,
			open: true
		};

		this.state.workingTags = tagUtilities.createTagList(this.state.tags);

		this.state.workingStart = datesUtilities.transformObjectToMoment(this.state.start);
		this.state.workingEnd = datesUtilities.transformObjectToMoment(this.state.end);
		console.log('this.state.workingStart ', this.state.workingStart);
		console.log('this.state.workingEnd ', this.state.workingEnd);

		this.handleTagDelete = this.handleTagDelete.bind(this);
		this.handleTagAddition = this.handleTagAddition.bind(this);
		this.handleTagDrag = this.handleTagDrag.bind(this);
		// console.log('<<< TaskDialog::constructor; this.state ', this.state);
	}

	closeDialog = () => {
		// console.log('TaskDialog::closeDialog');
		this.setState({
			open: false
		});
		this.props.close();
	};

	handleSubmit = () => {
		// console.log('>>> TaskDialog::handleSubmit; state ', this.state);
		if (this.state.title.length < 1) {
			this.setState({ errorTitle: true });
			return;
		}

		const { goalId, projectId } = this.props;
		const obj = JSON.parse(JSON.stringify(this.state));

		const tags = [];
		this.state.workingTags.forEach(tag => {
			tags.push(tag.text);
		});
		obj.tags = tags;

		obj.start = datesUtilities.transformMomentToObject(this.state.workingStart);
		obj.end = datesUtilities.transformMomentToObject(this.state.workingEnd);

		console.log('TaskDialog::handleSubmit; before add/update; obj ', obj);
		const { taskid } = this.state;
		if (taskid <= 0) {
			this.props.actions.addTask(goalId, projectId, obj);
		} else {
			this.props.actions.updateTask(goalId, projectId, taskid, obj);
		}
		this.closeDialog();
		// console.log('<<< TaskDialog::handleSubmit');
	};

	handleCancel = () => {
		// console.log('TaskDialog::handleCancel');
		this.closeDialog();
	};

	handleChange = name => ({ target: { value } }) => {
		// console.log('TaskDialog::handleChange; name ', name, ' value ', value);
		this.setState({
			[name]: value
		});
	};

	handleNumberChange = name => ({ target: { value } }) => {
		// console.log('TaskDialog::handleChange; name ', name, ' value ', value);
		this.setState({
			[name]: value * 1
		});
	};

	handleStartDate = moment => {
		console.log('--- TaskDialog::handleStartDate(); moment ', moment);
		this.setState({
			workingStart: moment
		});
	};

	handleDueDate = moment => {
		console.log('--- TaskDialog::handleDueDate(); moment ', moment);
		this.setState({
			workingEnd: moment
		});
	};

	handleTagAddition(tag) {
		// console.log('>>> TaskDialog::handleTagAddition(), tag ', tag);
		const { workingTags } = this.state;
		workingTags.push({
			id: tag,
			text: tag
		});
		this.setState({ workingTags });
		// console.log('<<< TaskDialog::handleTagAddition(), tags ', workingTags);
	}

	handleTagDelete(idx) {
		// console.log('--- TaskDialog::handleTagDelete(), idx ', idx);
		const { workingTags } = this.state;
		this.setState({
			workingTags: workingTags.filter((tag, index) => index !== idx)
		});
	}

	handleTagDrag(tag, currPos, newPos) {
		// console.log('>>> TaskDialog::handleTagDrag(), tag ', tag, ' currPos ', currPos, ' newPos ', newPos);
		const { workingTags } = this.state;
		const newTags = workingTags.slice();
		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);
		this.setState({ workingTags: newTags });
		// console.log('<<< TaskDialog::handleTagDrag(); workingTags ', this.state.workingTags);
	}

	render() {
		// console.log('--- TaskDialog::render');
		const { classes } = this.props;

		const statusOptions = taskStatusUtilities.getTaskStatusOptions();
		const repeatOptions = taskRepeatUtilities.taskRepeatOptions();
		// const tags = tagUtilities.createTagList(this.state.tags);
		const suggestions = tagUtilities.createTagSuggestionsList(this.state.workingTags, this.props.goals);
		// console.log('this.state.workingTags ', this.state.workingTags);
		// console.log('suggestions ', suggestions);

		return (
			<Dialog open={this.state.open} onClose={this.closeDialog}>
				<DialogTitle>{this.state.taskid > 0 ? 'Edit Task' : 'Add Task'}</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>Please fill out the form below.</DialogContentText> */}
					<form>
						<TextField
							required
							error={this.state.errorTitle}
							label="Title"
							value={this.state.title}
							onChange={this.handleChange('title')}
							margin="normal"
							className={classes.FormControl}
						/>
						<br />

						<FormControl className={classes.FormControl}>
							<InputLabel shrink={this.state.workingStart !== null}>Start Date</InputLabel>
							<br />
							<TaskDateTimePicker id="startDate" value={this.state.workingStart} onSubmit={this.handleStartDate} />
						</FormControl>
						{/* <br /> */}

						<FormControl className={classes.FormControl}>
							<InputLabel shrink={this.state.workingEnd !== null}>Due Date</InputLabel>
							<br />
							<TaskDateTimePicker value={this.state.workingEnd} onSubmit={this.handleDueDate} />
						</FormControl>
						<br />

						<FormControl className={classnames(classes.midsize, classes.FormControl)}>
							<InputLabel htmlFor="status">Status</InputLabel>
							<Select value={this.state.status} onChange={this.handleChange('status')}>
								{statusOptions.map(opt => (
									<MenuItem key={opt.id} value={opt.id}>
										{opt.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<br />

						<TextField
							inputProps={{
								maxLength: 5
							}}
							label="Estimate"
							value={this.state.estimate}
							onChange={this.handleChange('estimate')}
							margin="normal"
							className={classnames(classes.narrow, classes.FormControl)}
						/>
						<br />

						<FormControl className={classnames(classes.tags, classes.FormControl)}>
							<ReactTags
								id="tags"
								inline={false}
								tags={this.state.workingTags}
								suggestions={suggestions}
								minQueryLength={2}
								autocomplete
								handleDelete={this.handleTagDelete}
								handleAddition={this.handleTagAddition}
								handleDrag={this.handleTagDrag}
							/>
						</FormControl>
						<br />

						<FormControl className={classnames(classes.midsize, classes.FormControl)}>
							<InputLabel htmlFor="repeat">Repeat</InputLabel>
							<Select value={this.state.repeat} onChange={this.handleChange('repeat')}>
								{repeatOptions.map(opt => (
									<MenuItem key={opt.id} value={opt.id}>
										{opt.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							id="number"
							label="Interval"
							value={this.state.interval}
							onChange={this.handleNumberChange('interval')}
							type="number"
							className={classnames(classes.narrow, classes.FormControl)}
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{ min: '1', max: '10', step: '1' }}
							margin="normal"
						/>
						<br />

						<TextField
							multiline
							rows="3"
							label="Description"
							value={this.state.description}
							onChange={this.handleChange('description')}
							margin="dense"
							className={classes.FormControl}
						/>
						<br />

						{/* <TextField
							label="Actual"
							value={this.state.actual}
							onChange={this.handleChange('actual')}
							margin="dense"
							className={classnames(classes.narrow, classes.FormControl)}
						/>
						<br /> */}

						<FormControl className={classes.FormControl}>
							<div className={classes.buttons}>
								<Button className={classes.button} color="primary" variant="raised" onClick={this.handleCancel}>
									Cancel
								</Button>
								<Button className={classes.button} color="primary" variant="raised" onClick={this.handleSubmit}>
									Done
								</Button>
							</div>
						</FormControl>
					</form>
				</DialogContent>
			</Dialog>
		);
	}
}

TaskDialog.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		addTask: PropTypes.func.isRequired,
		updateTask: PropTypes.func.isRequired
	}).isRequired,
	close: PropTypes.func.isRequired
};

TaskDialog.defaultProps = {
	task: {
		taskid: 0,
		title: '',
		description: '',
		status: 0,
		starred: false,
		tags: [],
		estimate: '',
		repeat: 0,
		interval: 1,
		start: null,
		end: null,
		actual: ''
	}
};

const mapStateToProps = state => ({
	goals: state.user.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(
	TaskDialog
);
