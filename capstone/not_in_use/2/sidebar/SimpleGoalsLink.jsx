
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { goalsType } from '../../types';
import * as actions from '../../actions/';

class SimpleGoalsLink extends React.Component {
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- SimpleGoalsLink::constructor ', props);
	}
	render() {
		const links = this.props.goals.map(item => (
			<div key={item.id} >
				<Link to={`/simple/goal/${item.id}`}>
					<button>{item.description}</button>
				</Link>
			</div>
		));
		return links;
	}
}

SimpleGoalsLink.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleGoalsLink);
