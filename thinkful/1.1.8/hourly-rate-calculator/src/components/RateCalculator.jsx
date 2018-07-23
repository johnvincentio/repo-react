import React from 'react';

import NumberInput from './NumberInput';
import Output from './Output';

export default class RateCalculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dayRate: 100,
			hours: 10
		};
	}

	changeDayRate = dayRate => {
		// console.log('changeDayRate; dayRate ', dayRate);
		this.setState({ dayRate });
	};
	changeHours = hours => {
		// console.log('changeHours; hours ', hours);
		this.setState({ hours });
	};

	render() {
		console.log('RateCalculator::render()');
		const rate = this.state.dayRate / this.state.hours;
		return (
			<form>
				<NumberInput
					id="day-rate"
					label="Day rate"
					min={0}
					max={5000}
					value={this.state.dayRate}
					onChange={value => this.changeDayRate(value)}
				/>
				<NumberInput
					id="hours"
					label="Hours"
					min={1}
					max={12}
					value={this.state.hours}
					onChange={value => this.changeHours(value)}
				/>
				<Output id="hourly-rate" label="Hourly rate" value={rate.toFixed(2)} />
			</form>
		);
	}
}
