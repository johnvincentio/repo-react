
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
// import { Sparklines } from 'react-sparklines';

import * as actions from '../actions/index';

class WeatherList extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> WeatherList; constructor');
		console.log(props);
		console.log(actions);
		console.log('<<< WeatherList; constructor');
	}
	renderWeather(cityData) {
		const name = cityData.city.name;
		const temps = cityData.list.map(weather => weather.main.temp);
		const pressures = cityData.list.map(weather => weather.main.pressure);
		const humidities = cityData.list.map(weather => weather.main.humidity);

		console.log('temps ',temps);
		console.log('pressures ',pressures);
		console.log('humidities ',humidities);

		return (
			<tr key={name}>
				<td>{name}</td>
				<td>
					<Sparklines height={120} width={180} data={temps}>
						<SparklinesLine color="red" />
					</Sparklines>
				</td>
				<td>
					<Sparklines height={120} width={180} data={pressures}>
						<SparklinesLine color="red" />
					</Sparklines>
				</td>
				<td>
					<Sparklines height={120} width={180} data={humidities}>
						<SparklinesLine color="red" />
					</Sparklines>
				</td>
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature</th>
						<th>Pressure</th>
						<th>Humidity</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = state => ({
	weather: state.weather,
});

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch),
// });

export default connect(mapStateToProps)(WeatherList);
