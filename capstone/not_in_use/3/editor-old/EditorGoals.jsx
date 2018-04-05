import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import { goalsType } from '../../types';

import Layout from '../main/Layout';

import ListGoals from './ListGoals';
import ExpandableButton from '../../toolbox/ExpandableButton';

class EditorGoals extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- EditorGoals::constructor ', props);
		this.state = { draggedElement: '' };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);
	}

	getDraggedElement() {
		// console.log('EditorGoals::getDraggedElement, this.state.draggedElement', this.state.draggedElement);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		// console.log('EditorGoals::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}

	render() {
		// console.log('EditorGoals::render() props ', this.props);
		return (
			<Layout addGoal>
				<div className="editor">
					{/* <h2 className="editor--h2">Goals</h2>
					<p className="editor--p">Lorem, ipsum dolor.</p> */}
					{/* <p>
					Setting personal goals is a powerful way to direct your energy and determine what you want to achieve in life. Unlike tasks, which have a clear path of action, goals are usually vague and difficult to quantify. Once you define your goals, you can assign them to individual tasks and keep track of your progress. This is a helpful way to see which goals you are progressing on and which goals need more attention.
					</p> */}

					<div className="editor--goals-container">
						<ListGoals
							goals={this.props.goals}
							getDraggedElement={this.getDraggedElement}
							setDraggedElement={this.setDraggedElement}
						/>
						<ExpandableButton />
					</div>
				</div>
			</Layout>
		);
	}
}

EditorGoals.propTypes = {
	goals: goalsType.isRequired // eslint-disable-line react/no-typos
	// selected: selectType.isRequired,		// eslint-disable-line react/no-typos
	// command: commandType.isRequired,		// eslint-disable-line react/no-typos
};

// const mapStateToProps = (state) => {
// 	console.log('Editor::mapStateToProps, state ', state);
// 	return {
// 		goals: state.dataReducer.goals,
// 	};
// };

const mapStateToProps = state => ({
	selected: state.selectedReducer.selected,
	command: state.commandReducer.command
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorGoals);
