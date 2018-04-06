import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import Layout from '../containers/Layout';
import ViewCalendar from './ViewCalendar';

// import events from './events';

import { goalsType, matchType } from '../../types';
import * as taskUtilities from '../../utilities/taskUtilities';
import * as datesUtilities from '../../utilities/datesUtilities';

class CalendarMain extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- CalendarMain::constructor, props ', props);
		this.onEventDrop = this.onEventDrop.bind(this);
	}

	onEventDrop(event, start, end) {
		// console.log('--- CalendarMain::onEventDrop(), event ', event, ' start ', start, ' end ', end);
		const { goalId, projectId, taskId } = event;

		const startObj = datesUtilities.transformMomentToObject(start);
		const endObj = datesUtilities.transformMomentToObject(end);
		// console.log('startObj ', startObj, ' endObj ', endObj);

		this.props.actions.updateUserDatesTask(goalId, projectId, taskId, startObj, endObj);
	}

	render() {
		const { goals } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- CalendarMain::render, param ', param);
		const events = taskUtilities.eventsListFromGoals(param, goals);
		// console.log('--- CalendarMain::render, events ', events);
		return (
			<Layout datatype="calendar">
				<ViewCalendar events={events} onEventDrop={this.onEventDrop} />
			</Layout>
		);
	}
}

CalendarMain.propTypes = {
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	match: matchType.isRequired, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		updateUserDatesTask: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMain);
