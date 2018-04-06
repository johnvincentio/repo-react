import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import * as actions from '../../actions/';

import Layout from '../containers/Layout';

import { ListProjects, ListProject } from './';
import ExpandableButton from '../../toolbox/ExpandableButton';

import { goalsType, matchType } from '../../types';
import * as projectUtilities from '../../utilities/projectUtilities';
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

class ProjectsMain extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ProjectsMain::constructor ', props);
		this.state = { draggedElement: '' };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);
	}

	getDraggedElement() {
		// console.log('ProjectsMain::getDraggedElement, this.state.draggedElement', this.state.draggedElement);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		// console.log('ProjectsMain::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}
	render() {
		const { classes, goals, datatype } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- ProjectsMain::render, datatype ', datatype, ' param ', param);

		let div = '';
		if (datatype === 'projects') {
			div = goals.map(goal => (
				<Fragment key={`goal-${goal.id}`}>
					<ListProjects
						goalId={goal.id}
						projects={goal.projects}
						getDraggedElement={this.getDraggedElement}
						setDraggedElement={this.setDraggedElement}
					/>
				</Fragment>
			));
		} else if (datatype === 'project') {
			const goal = goalUtilities.goalFromGoalsByProjectId(param * 1, goals);
			// console.log('ProjectsMain::render(), goal ', goal);

			const project = projectUtilities.projectFromGoalsById(param * 1, goals);
			// console.log('ProjectsMain::render(), project ', project);
			div = (
				<ListProject
					key={`project_key_${goal.goal.id}_${project.id}`}
					goalId={goal.goal.id}
					project={project}
					idx={0}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			);
		}

		return (
			<Layout datatype={datatype}>
				<Paper className={classes.container}>{div}</Paper>
				<ExpandableButton />
			</Layout>
		);
	}
}

ProjectsMain.propTypes = {
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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(ProjectsMain);
