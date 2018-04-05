
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

import { selectType } from '../types';

/*
https://codepen.io/SoufianeLasri/pen/BobJzG?q=expand+button&limit=all&type=type-pens
*/

class ExpandableButton extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ExpandableButton::constructor ', props);
		this.state = { buttonActive: false };
		this.handleClickMenu = this.handleClickMenu.bind(this);
		this.escFunction = this.escFunction.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.escFunction, false);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.escFunction, false);
	}

	escFunction(event) {
		// console.log('ExpandableButton::escFunction, event ', event);
		if (event.keyCode === 27) {
			this.handleClickMenu(event);
		}
	}

	handleClickMenu(event) {
		// console.log('ExpandableButton::handleClickMenu, event ', event);
		event.preventDefault();
		this.setState({ buttonActive: !this.state.buttonActive });
	}

	// handleClickMenuItem(param) {
	// 	console.log('ExpandableButton::handleClickMenuItem, param ', param);
	// 	this.setState({ buttonActive: false });
	// }

	handleClickMenuAdd() {
		// console.log('ExpandableButton::handleClickMenuAdd');
		this.props.actions.commandAdd();
		this.setState({ buttonActive: false });
		const { selectedType } = this.props.selected;
		if (selectedType === '') {
			this.props.history.push('/goals');
		}
	}

	handleClickMenuEdit() {
		// console.log('ExpandableButton::handleClickMenuEdit');
		this.props.actions.commandEdit();
		this.setState({ buttonActive: false });
	}

	handleClickMenuClone() {
		// console.log('ExpandableButton::handleClickMenuClone');
		const {
			selectedType, selectedGoalId, selectedProjectId, selectedTaskId,
		} = this.props.selected;
		// console.log('selectedType ', selectedType);
		switch (selectedType) {
			case 'goal':
				// console.log('clone goal, goalId ', selectedGoalId);
				this.props.actions.cloneUserGoal(selectedGoalId);
				break;
			case 'project':
				// console.log('clone project, goalId ', selectedGoalId, ' projectId ', selectedProjectId);
				this.props.actions.cloneUserProject(selectedGoalId, selectedProjectId);
				break;
			case 'task':
				// console.log('clone task, goalId ', selectedGoalId, ' projectId ', selectedProjectId, ' selectedTaskId ', selectedTaskId);
				this.props.actions.cloneUserTask(selectedGoalId, selectedProjectId, selectedTaskId);
				break;
			default:
		}
		this.setState({ buttonActive: false });
	}

	handleClickMenuDelete() {
		// console.log('ExpandableButton::handleClickMenuDelete');
		const {
			selectedType, selectedGoalId, selectedProjectId, selectedTaskId,
		} = this.props.selected;
		// console.log('selectedType ', selectedType);
		switch (selectedType) {
			case 'goal':
				// console.log('delete goal, goalId ', selectedGoalId);
				this.props.actions.deleteUserGoal(selectedGoalId);
				this.props.actions.selectedInitialize();
				break;
			case 'project':
				// console.log('delete project, goalId ', selectedGoalId, ' projectId ', selectedProjectId);
				this.props.actions.deleteUserProject(selectedGoalId, selectedProjectId);
				this.props.actions.selectedInitialize();
				break;
			case 'task':
				// console.log('delete task, goalId ', selectedGoalId, ' projectId ', selectedProjectId, ' selectedTaskId ', selectedTaskId);
				this.props.actions.deleteUserTask(selectedGoalId, selectedProjectId, selectedTaskId);
				this.props.actions.selectedInitialize();
				break;
			default:
		}
		this.setState({ buttonActive: false });
	}

	handleClickMenuLink() {
		// console.log('ExpandableButton::handleClickMenuLink');
		const {
			selectedType, selectedGoalId, selectedProjectId,
		} = this.props.selected;
		// console.log('selectedType ', selectedType);
		switch (selectedType) {
			case 'goal':
				// console.log('link goal, goalId ', selectedGoalId);
				this.props.history.push(`/goal/${selectedGoalId}`);
				break;
			case 'project':
				// console.log('link project, goalId ', selectedGoalId, ' projectId ', selectedProjectId);
				this.props.history.push(`/project/${selectedProjectId}`);
				break;
			default:
		}
	}

	render() {
		const buttonClass = this.state.buttonActive ? 'isActive' : '';
		const { selectedType } = this.props.selected;
		const showEdit = selectedType !== '';
		const showAdd = selectedType !== 'task';
		const showClone = showEdit;
		const showDelete = showEdit;
		const showLink = selectedType === 'goal' || selectedType === 'project';

		return (
			<div className={`${buttonClass} expandableButton`}>
				<button className="expandButton" onClick={this.handleClickMenu}><i className="fa fa-cog" /></button>
				{showAdd &&
					<button className="add" onClick={() => this.handleClickMenuAdd()}><i className="fa fa-plus" /></button>
				}
				{showEdit &&
					<button className="edit" onClick={() => this.handleClickMenuEdit()}><i className="fa fa-pencil" /></button>
				}
				{showClone &&
					<button className="clone" onClick={() => this.handleClickMenuClone()}><i className="fa fa-clone" /></button>
				}
				{showDelete &&
					<button className="delete" onClick={() => this.handleClickMenuDelete()}><i className="fa fa-trash" /></button>
				}
				{showLink &&
					<button className="link" onClick={() => this.handleClickMenuLink()}><i className="fa fa-external-link" /></button>
				}
			</div>
		);
	}
}

ExpandableButton.propTypes = {
	selected: selectType.isRequired,		// eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		selectedInitialize: PropTypes.func.isRequired,
		cloneUserGoal: PropTypes.func.isRequired,
		deleteUserGoal: PropTypes.func.isRequired,
		cloneUserProject: PropTypes.func.isRequired,
		deleteUserProject: PropTypes.func.isRequired,
		cloneUserTask: PropTypes.func.isRequired,
		deleteUserTask: PropTypes.func.isRequired,
		commandAdd: PropTypes.func.isRequired,
		commandEdit: PropTypes.func.isRequired,
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	selected: state.selectedReducer.selected,
	command: state.selectedReducer.command,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExpandableButton));
