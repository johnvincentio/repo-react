
import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const events = [
	{
		title: 'All Day Event very long title',
		allDay: true,
		start: new Date(2015, 3, 0),
		end: new Date(2015, 3, 1),
	},
];
const startDate = new Date(2015, 1, 1);
const endDate = new Date(2016, 1, 1);

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- Calendar::constructor(), props ', props);
	}

	render() {
		console.log('--- Calendar::render()');
		return (
			<div>
				<BigCalendar
					events={events}
					startAccessor={startDate}
					endAccessor={endDate}
				/>
			</div>
		);
	}
}

export default Calendar;
