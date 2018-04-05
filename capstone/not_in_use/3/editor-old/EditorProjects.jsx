import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';
import { goalsType } from '../../types';

import Layout from '../main/Layout';

import ListProjects from './ListProjects';
import ExpandableButton from '../../toolbox/ExpandableButton';

class EditorProjects extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- EditorProjects::constructor ', props);
		this.state = { draggedElement: '' };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);
	}

	getDraggedElement() {
		console.log(
			'EditorProjects::getDraggedElement, this.state.draggedElement',
			this.state.draggedElement
		);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		console.log('EditorProjects::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}

	render() {
		// console.log('EditorProjects::render() props ', this.props);
		const div = this.props.goals.map(goal => (
			<div key={`goal-${goal.id}`}>
				<ListProjects
					goalId={goal.id}
					projects={goal.projects}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			</div>
		));
		return (
			<Layout>
				<div className="editor">
					<div className="editor--projects-container">{div}</div>
					<ExpandableButton />
				</div>
			</Layout>
		);
	}
}

EditorProjects.propTypes = {
	goals: goalsType.isRequired // eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorProjects);
