
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { goalsType } from '../../types';
import * as actions from '../../actions/';
import * as tagsUtilities from '../../utilities/tags';

class TagsLink extends React.Component {
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- TagsLink::constructor ', props);
		// this.onClickSelectGoal = this.onClickSelectGoal.bind(this);
	}

	render() {
		// console.log('TagsLink::render(), props ', this.props);
		const arr = tagsUtilities.uniqueTagsFromGoals(this.props.goals);
		// console.log('arr ', arr);
		const links = arr.map(tag => (
			<div key={`tag-${tag}`} >
				<Link to={`/tag/${tag}`}>
					<button>{tag}</button>
				</Link>
			</div>
		));
		return links;
	}
}

TagsLink.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsLink);
