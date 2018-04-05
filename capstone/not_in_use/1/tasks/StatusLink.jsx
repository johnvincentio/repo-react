
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/';

class StatusLink extends React.Component {	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- StatusLink::constructor ', props);
		// this.onClickSelectGoal = this.onClickSelectGoal.bind(this);
	}

	render() {
		// console.log('StatusLink::render(), props ', this.props);
		return (
			<div>
				<div>
					<Link to="/status/all">
						<button>All</button>
					</Link>
				</div>
				<div>
					<Link to="/status/none">
						<button>None</button>
					</Link>
				</div>
				<div>
					<Link to="/status/started">
						<button>Started</button>
					</Link>
				</div>
				<div>
					<Link to="/status/completed">
						<button>Completed</button>
					</Link>
				</div>
				<div>
					<Link to="/status/planning">
						<button>Planning</button>
					</Link>
				</div>
				<div>
					<Link to="/status/waiting">
						<button>Waiting</button>
					</Link>
				</div>
				<div>
					<Link to="/status/hold">
						<button>Hold</button>
					</Link>
				</div>
				<div>
					<Link to="/status/postponed">
						<button>Postponed</button>
					</Link>
				</div>
				<div>
					<Link to="/status/canceled">
						<button>Canceled</button>
					</Link>
				</div>
				<div>
					<Link to="/status/someday">
						<button>Someday</button>
					</Link>
				</div>
				<div>
					<Link to="/status/reference">
						<button>Reference</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(StatusLink);
