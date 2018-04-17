
import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

import { goalsType, taskType } from '../types';
import * as tagsUtilities from '../utilities/tagUtilities';

class Tags extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- Tags::constructor(), props ', props);
		this.state = {
			goalId: this.props.goalId,
			projectId: this.props.projectId,
			task: this.props.task,
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		// console.log('this.state ', this.state);
	}

	handleDelete(index) {
		// console.log('--- Tags::handleDelete(), index ', index);
		const { goalId, projectId, task } = this.state;
		this.props.actions.deleteUserTaskTag(goalId, projectId, task.id, index);
	}

	handleAddition(tag) {
		// console.log('--- Tags::handleAddition(), tag ', tag);
		const { goalId, projectId, task } = this.state;
		this.props.actions.addUserTaskTag(goalId, projectId, task.id, tag);
	}

	handleDrag(tag, currPos, newPos) {
		// console.log('--- Tags::handleDrag(), tag ', tag, ' currPos ', currPos, ' newPos ', newPos);
		const { goalId, projectId, task } = this.state;
		this.props.actions.moveUserTaskTag(goalId, projectId, task.id, tag.id, currPos, newPos);
	}

	render() {
		// console.log('--- Tags::render()');
		const tags = tagsUtilities.createTagList(this.props.task.tags);
		const suggestions = tagsUtilities.createTagSuggestionsList(tags, this.props.goals);
		// const { tags, suggestions } = this.state;
		return (
			<div>
				<ReactTags
					tags={tags}
					suggestions={suggestions}
					minQueryLength={2}
					autocomplete
					handleDelete={this.handleDelete}
					handleAddition={this.handleAddition}
					handleDrag={this.handleDrag}
				/>
			</div>
		);
	}
}

Tags.propTypes = {
	goals: goalsType.isRequired,		// eslint-disable-line react/no-typos
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	task: taskType.isRequired,		// eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		addUserTaskTag: PropTypes.func.isRequired,
		deleteUserTaskTag: PropTypes.func.isRequired,
		moveUserTaskTag: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
