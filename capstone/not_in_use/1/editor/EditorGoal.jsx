
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { goalsType, matchType } from '../../types';
import * as goalUtilities from '../../utilities/goalUtilities';

import OpenMenu from '../OpenMenu';
import ListGoal from './ListGoal';
import ExpandableButton from '../../toolbox/ExpandableButton';

class EditorGoal extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- EditorGoal::constructor ', props);
		this.state = { draggedElement: '' };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);
	}

	getDraggedElement() {
		console.log('ListGoals::getDraggedElement, this.state.draggedElement', this.state.draggedElement);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		console.log('ListGoals::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}

	render() {
		// console.log('EditorGoal::render() props ', this.props);
		const id = this.props.match.params.goalId * 1;
		// console.log('find goal id ', id);
		const goal = goalUtilities.goalFromGoalsById(id, this.props.goals);
		// console.log('goal ', goal);
		return (
			<div>
				<div>
					<OpenMenu />
				</div>
				<div className="editor">
					<div className="editor--goals-container">
						<ListGoal
							goal={goal}
							idx={0}
							getDraggedElement={this.getDraggedElement}
							setDraggedElement={this.setDraggedElement}
						/>
						<ExpandableButton />
					</div>
				</div>
			</div>
		);
	}
}

EditorGoal.propTypes = {
	goals: goalsType.isRequired,		// eslint-disable-line react/no-typos
	match: matchType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorGoal);
