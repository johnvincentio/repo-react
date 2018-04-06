import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import * as actions from '../../actions/';

import Layout from '../containers/Layout';

import { Goal } from './';
import ExpandableButton from '../../toolbox/ExpandableButton';

import { goalsType, matchType } from '../../types';
import * as taskUtilities from '../../utilities/taskUtilities';
import * as goalUtilities from '../../utilities/goalUtilities';

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
		// padding: '20px',
		// minHeight: '500px'
		// margin: '10px'
	}
};

class GoalsMain extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- GoalsMain::constructor ', props);
		this.state = { draggedElement: '' };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);
	}

	getDraggedElement() {
		// console.log('GoalsMain::getDraggedElement, this.state.draggedElement', this.state.draggedElement);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		// console.log('GoalsMain::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}
	render() {
		const { classes, goals, datatype } = this.props;
		const { param } = this.props.match.params;
		console.log('--- GoalsMain::render, datatype ', datatype, ' param ', param);

		const tmpGoals = JSON.parse(JSON.stringify(goals));
		let partialGoals = [];
		switch (datatype) {
			// case 'status':
			// 	partialGoals = taskStatusUtilities.dataFromGoalsByStatus(param, tmpGoals);
			// 	break;
			// case 'tags':
			// case 'tag':
			// 	partialGoals = tagUtilities.dataFromGoalsByTag(param, tmpGoals);
			// 	break;
			// case 'tasks':
			// 	partialGoals = taskUtilities.dataFromGoalsByStatus(param, tmpGoals);
			// 	break;
			case 'task':
				partialGoals = taskUtilities.dataFromGoalsByTaskId(param, tmpGoals);
				break;
			case 'goal':
				partialGoals = goalUtilities.goalFromGoalsById(param, tmpGoals);
				console.log('partialGoals ', partialGoals);
				break;
			case 'goals':
			default:
				partialGoals = tmpGoals;
		}

		let div = '';
		switch (datatype) {
			case 'goal':
				div = (
					<Goal
						goal={partialGoals}
						idx={0}
						getDraggedElement={this.getDraggedElement}
						setDraggedElement={this.setDraggedElement}
					/>
				);
				break;
			case 'goals':
			case 'task':
			default:
				div = partialGoals.map((item, idx) => (
					<Goal
						key={`goal_key_${item.id}`}
						goal={item}
						idx={idx}
						getDraggedElement={this.getDraggedElement}
						setDraggedElement={this.setDraggedElement}
					/>
				));
		}
		return (
			<Layout datatype={datatype}>
				<Paper className={classes.container}>{div}</Paper>
				<ExpandableButton />
			</Layout>
		);
	}
}

GoalsMain.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	match: matchType.isRequired, // eslint-disable-line react/no-typos
	datatype: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(GoalsMain);
