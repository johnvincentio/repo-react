/**
 * Utility methods to handle dates
 *
 * @class DatesUtils
 */

import Moment from 'moment';

/* eslint-disable class-methods-use-this */

class DatesUtils {
	createToday() {
		return { date: Moment().format('YYYY-MM-DD'), time: '00:00' };
	}

	createMaxDate(obj) {
		if (!obj) {
			return { date: '', time: '' };
		}
		return {
			date: Moment(obj.date)
				.add(1, 'week')
				.format('YYYY-MM-DD'),
			time: '23:59'
		};
	}

	transformDateObject(obj) {
		if (!obj) {
			return { date: '', time: '' };
		}
		if (!obj.time) {
			return { date: obj.date, time: '' };
		}
		return obj;
	}

	transformObjectToMoment(obj) {
		if (!obj || !obj.date) {
			return null;
		}
		let { time } = obj;
		if (!obj.time) {
			time = '00:00';
		}
		const dateTime = `${obj.date} ${time}`;
		// console.log('transformObjectToMoment, dateTime ', dateTime);
		const moment = Moment(dateTime, 'YYYY-MM-DD HH:mm');
		// console.log('moment ', moment);
		return moment;
	}

	transformObjectToDate(obj) {
		if (!obj || !obj.date) {
			return null;
		}
		const moment = this.transformObjectToMoment(obj);
		const date = moment.toDate();
		return date;
	}

	transformObjectToString(obj) {
		if (!obj || !obj.date) {
			return null;
		}
		let { time } = obj;
		if (!obj.time) {
			time = '00:00';
		}
		const dateTime = `${obj.date} ${time}`;
		// console.log('transformObjectToString, dateTime ', dateTime);
		return dateTime;
	}

	transformObjectToUserDateString(obj) {
		// console.log('transformObjectToUserDateString; obj ', obj);
		if (!obj || !obj.date) {
			return null;
		}

		const date = Moment(obj.date).format('DD MMM YYYY');
		// console.log('date ', date);
		if (!obj.time) {
			return date;
		}

		const dateTime = `${obj.date} ${obj.time}`;
		// const time = Moment(dateTime).format('DD MMM YYYY HH:mm');
		const time = Moment(dateTime).format('hh:mma');
		// return `${time}, ${date}`;
		return `${date} ${time}`;
	}

	transformMomentToObject(moment) {
		// console.log('transformMomentToObject, moment ', moment);
		if (!moment) {
			return null;
		}
		const date = Moment(moment).format('YYYY-MM-DD');
		const time = Moment(moment).format('HH:mm');
		return { date, time };
	}

	isScheduled(task) {
		if (!task) {
			return false;
		}
		if ('start' in task || 'end' in task) {
			return true;
		}
		return false;
	}

	isEvent(task) {
		if (!task) {
			return false;
		}
		if (
			typeof task.start !== 'undefined' &&
			typeof task.start.date !== 'undefined' &&
			typeof task.start.time !== 'undefined'
		) {
			return true;
		}
		if (
			typeof task.end !== 'undefined' &&
			typeof task.end.date !== 'undefined' &&
			typeof task.end.time !== 'undefined'
		) {
			return true;
		}
		return false;
	}

	isLate(task) {
		if (!task) {
			return false;
		}
		if (typeof task.end !== 'undefined' && typeof task.end.date !== 'undefined') {
			const date = this.transformObjectToMoment(task.end);
			const now = Moment();
			// console.log('date ', date, 'now ', now);
			return now > date;
		}
		return false;
	}
}

module.exports = DatesUtils;
