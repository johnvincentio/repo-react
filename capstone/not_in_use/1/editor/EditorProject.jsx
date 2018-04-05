
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { goalsType, matchType } from '../../types';
import * as goalUtilities from '../../utilities/goalUtilities';
import * as projectUtilities from '../../utilities/projectUtilities';

import OpenMenu from '../OpenMenu';
import ListProject from './ListProject';
import ExpandableButton from '../../toolbox/ExpandableButton';

class EditorProject extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- EditorProject::constructor ', props);
		this.state = { draggedElement: '' };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);
	}

	getDraggedElement() {
		console.log('EditorProject::getDraggedElement, this.state.draggedElement', this.state.draggedElement);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		console.log('EditorProject::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}

	render() {
		// console.log('EditorProject::render() props ', this.props);
		const id = this.props.match.params.projectId * 1;
		// console.log('find project id ', id);

		const goal = goalUtilities.goalFromGoalsByProjectId(id, this.props.goals);
		// console.log('EditorProject::render(), goal ', goal);

		const project = projectUtilities.projectFromGoalsById(id, this.props.goals);
		// console.log('EditorProject::render(), project ', project);

		return (
			<div>
				<div>
					<OpenMenu />
				</div>
				<div className="editor">
					<div className="editor--projects-container">
						<div>
							<ListProject
								key={`project_key_${goal.goal.id}_${project.id}`}
								goalId={goal.goal.id}
								project={project}
								idx={0}
								getDraggedElement={this.getDraggedElement}
								setDraggedElement={this.setDraggedElement}
							/>
							<ExpandableButton />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditorProject.propTypes = {
	goals: goalsType.isRequired,		// eslint-disable-line react/no-typos
	match: matchType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorProject);
