/*
https://github.com/intljusticemission/react-big-calendar/blob/master/examples/demos/dnd.js

https://skillgaze.com/2017/11/21/event-calendar-in-react/

*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import './view-calendar.scss';
import './react-big-calendar.scss';

// import events from './testEvents';

// import ResizableMonthEvent from 'react-big-calendar/lib/addons/dragAndDrop/ResizableMonthEvent';
// import ResizableEvent from 'react-big-calendar/lib/addons/dragAndDrop/ResizableEvent';

import { eventsType } from '../../types';

import { isCalendarWeekView } from '../../utilities/utils';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

function Event({ event }) {
	// console.log('Event ', event);
	return (
		<span>
			<strong>{event.title}</strong>
			{event.description && `:  ${event.description}`}
		</span>
	);
}

function EventAgenda({ event }) {
	// console.log('EventAgenda ', event);
	const title = encodeURIComponent(event.title);
	return (
		<span>
			{/* <em style={{ color: 'magenta' }}>{event.title}</em> */}
			<Link to={`/task/${event.taskId}/${title}`}>
				<em className="taskmuncher-view-calendar--agenda">{event.title}</em>
			</Link>
			<p>{event.description}</p>
		</span>
	);
}

class ViewCalendar extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- ViewCalendar::constructor(), props ', props);
		this.state = {
			defaultDate: new Date(),
			view: 'month'
		};

		this.onSelectEvent = this.onSelectEvent.bind(this);
		this.onSelectSlot = this.onSelectSlot.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.onView = this.onView.bind(this);

		this.onEventDrop = this.onEventDrop.bind(this);
		this.onEventResize = this.onEventResize.bind(this);

		// this.onSelecting = this.onSelecting.bind(this);
		// this.selected = this.selected.bind(this);
		// this.onSelectDate = this.onSelectDate.bind(this);
	}

	onSelectEvent(event) {
		// console.log('--- ViewCalendar::onSelectEvent(), event ', event);
		// console.log('event.start ', event.start);
		// console.log('event.end ', event.end);
		this.setState({ defaultDate: event.start });
	}

	onSelectSlot(slotInfo) {
		// console.log('--- ViewCalendar::onSelectSlot(), slotInfo ', slotInfo);
		// console.log('slotInfo.action ', slotInfo.action);
		// console.log('slotInfo.start ', slotInfo.start);
		// console.log('slotInfo.end ', slotInfo.end);
		// console.log('slots ', slotInfo.slots);
		this.setState({ defaultDate: slotInfo.start });
	}

	onNavigate(date) {
		// console.log('--- ViewCalendar::onNavigate(), date ', date);
		this.setState({ defaultDate: date });
	}

	onView(obj) {
		// console.log('--- ViewCalendar::onView(), obj ', obj);
		this.setState({ view: obj });
	}

	// onSelectDate(obj) {
	// 	console.log('*********************** --- ViewCalendar::onSelectDate(), obj ', obj);
	// }
	// onSelecting(index) {
	// 	console.log('--- ViewCalendar::onSelecting(), index ', index);
	// }

	// selected(index) {
	// 	console.log('--- ViewCalendar::selected(), index ', index);
	// }

	onEventDrop({ event, start, end }) {
		// console.log('--- ViewCalendar::onEventDrop(), event ', event, ' start ', start, ' end ', end);
		this.props.onEventDrop(event, start, end);
	}

	/* eslint-disable class-methods-use-this */
	onEventResize(resizeType, { event, start, end }) {
		// console.log('--- ViewCalendar::resizeEvent(), resizeType ', resizeType);
	}

	render() {
		// console.log('--- ViewCalendar::render, state ', this.state, ' props ', this.props);
		const views = isCalendarWeekView() ? ['month', 'day', 'agenda'] : ['month', 'week', 'day', 'agenda'];
		return (
			<div className="taskmuncher-view-calendar">
				<React.Fragment>
					<DragAndDropCalendar
						views={views}
						drilldownView="agenda"
						selectable
						popup
						showMultiDayTimes
						events={this.props.events}
						// events={events}
						date={this.state.defaultDate}
						// defaultDate={new Date(2015, 2, 1)}
						defaultView={this.state.view}
						onSelectEvent={this.onSelectEvent}
						onSelectSlot={this.onSelectSlot}
						onNavigate={this.onNavigate}
						onView={this.onView}
						onEventDrop={this.onEventDrop}
						resizable
						onEventResize={this.onEventResize}
						components={{
							event: Event,
							agenda: {
								event: EventAgenda
							}
						}}

						// onSelecting={this.onSelecting}
						// onSelectDate={this.onSelectDate}
					/>
				</React.Fragment>
			</div>
		);
	}
}

ViewCalendar.propTypes = {
	events: eventsType.isRequired, // eslint-disable-line react/no-typos
	onEventDrop: PropTypes.func.isRequired
};

export default DragDropContext(HTML5Backend)(ViewCalendar);

/*
<BigCalendar
    events={this.props.events}
    startAccessor={(event) => { return moment(event.clientData[0].date) }}
    endAccessor={(event) => { return moment(event.clientData[0].date) }}
/>
<BigCalendar
  selectable
  events={events}
  defaultView='week'
  date={this.state.selectedDay}
  onNavigate={(date) => { this.setState({ selectedDate: date }}
/>
<BigCalendar
culture='en'
events={this.state.events}
views={['month', 'week', 'day']}
defaultView='month'
style={{height: 800}}
defaultDate={new Date()}
/>

<BigCalendar
  view={view}
  onView={view => {
    this.setState({
      view,
    });
  }}
  date={new Date(moment(day).format())}
  onNavigate={(day) => {
    this.setState({
      day,
    });
 }}
/>
onSelectDate = (day: *): void => {
  this.setState({
    day,
    view: 'day', -> when user select a day in small calendar -> set view to 'day'
  });
};
*/
/*

<DragAndDropCalendar
	min={am8}
	max={pm8}
	selectable
	events={this.state.events}
	onEventDrop={this.moveEvent}
	defaultView="day"
		views={["month", "week", "day"]}
	onNavigate={(date, views) => {

	}}
	onView={view => {


	}}
	onSelectSlot={slot => this.createAppointment(slot)}
	onSelectEvent={event => this.modifyAppointment(event)}
/>
*/

/*
let MyOtherNestedComponent = () => <div>NESTED COMPONENT</div>

let MyCustomHeader = ({ label }) => (
  <div>
    CUSTOM HEADER:
    <div>{label}</div>
    <MyOtherNestedComponent />
  </div>
)

let CustomHeader = () => (
  <BigCalendar
    events={events}
    defaultDate={new Date(2015, 3, 1)}
    components={{
      day: { header: MyCustomHeader },
      week: { header: MyCustomHeader },
      month: { header: MyCustomHeader },
    }}
  />
)
*/

// const { events } = this.state;

// const idx = events.indexOf(event);
// const updatedEvent = { ...event, start, end };

// const nextEvents = [...events];
// nextEvents.splice(idx, 1, updatedEvent);

// this.setState({
// 	events: nextEvents,
// });

// alert(`${event.title} was dropped onto ${event.start}`);

/*
resizeEvent (resizeType, { event, start, end }) {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
	}
*/
