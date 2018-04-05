
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/';

class TasksLink extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- TasksLink::constructor ', props);
		// this.onClickSelectGoal = this.onClickSelectGoal.bind(this);
	}

	render() {
		// console.log('TasksLink::render(), props ', this.props);
		return (
			<div>
				<div>
					<Link to="/tasks/all">
						<button>All</button>
					</Link>
				</div>
				<div>
					<Link to="/">
						<button>Scheduled</button>
					</Link>
				</div>
				<div>
					<Link to="/">
						<button>Events</button>
					</Link>
				</div>
				<div>
					<Link to="/">
						<button>Late</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(TasksLink);
