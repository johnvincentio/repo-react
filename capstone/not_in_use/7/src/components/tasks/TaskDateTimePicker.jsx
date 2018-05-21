//

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// import TimePicker from 'material-ui-pickers/TimePicker';
// import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

class TaskDateTimePicker extends PureComponent {
	constructor(props) {
		super(props);
		// console.log('--- TaskDateTimePicker::constructor; props ', props);
		this.state = {
			selectedMoment: this.props.value
		};
	}

	handleDateChange = moment => {
		// console.log('TaskDateTimePicker::handleDateChange; moment ', moment);
		this.setState({ selectedMoment: moment });
		this.props.onSubmit(moment);
	};

	render() {
		return (
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<DateTimePicker value={this.state.selectedMoment} onChange={this.handleDateChange} />
			</MuiPickersUtilsProvider>
		);
	}
}

TaskDateTimePicker.propTypes = {
	value: PropTypes.instanceOf(Moment),
	onSubmit: PropTypes.func.isRequired
};

TaskDateTimePicker.defaultProps = {
	value: null
};

export default TaskDateTimePicker;
