import Moment from 'moment';

export function createToday() {
	return { date: Moment().format('YYYY-MM-DD'), time: '00:00' };
}

export function createMaxDate(obj) {
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

export function transformDateObject(obj) {
	if (!obj) {
		return { date: '', time: '' };
	}
	if (!obj.time) {
		return { date: obj.date, time: '' };
	}
	return obj;
}

export function transformObjectToMoment(obj) {
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

export function transformObjectToDate(obj) {
	if (!obj || !obj.date) {
		return null;
	}
	const moment = this.transformObjectToMoment(obj);
	const date = moment.toDate();
	return date;
}

export function transformObjectToString(obj) {
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

export function transformObjectToUserDateString(obj) {
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

export function transformMomentToObject(moment) {
	// console.log('transformMomentToObject, moment ', moment);
	if (!moment) {
		return null;
	}
	const date = Moment(moment).format('YYYY-MM-DD');
	const time = Moment(moment).format('HH:mm');
	return { date, time };
}

export function isScheduled(task) {
	if (!task) {
		return false;
	}
	if ('start' in task || 'end' in task) {
		return true;
	}
	return false;
}

export function isEvent(task) {
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
	if (typeof task.end !== 'undefined' && typeof task.end.date !== 'undefined' && typeof task.end.time !== 'undefined') {
		return true;
	}
	return false;
}

export function isLate(task) {
	if (!task) {
		return false;
	}
	if (typeof task.end !== 'undefined' && typeof task.end.date !== 'undefined') {
		const date = transformObjectToMoment(task.end);
		const now = Moment();
		// console.log('date ', date, 'now ', now);
		return now > date;
	}
	return false;
}
