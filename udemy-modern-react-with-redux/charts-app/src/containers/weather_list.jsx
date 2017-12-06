
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

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
		const { lon, lat } = cityData.city.coord;

		console.log('temps ',temps);
		console.log('pressures ',pressures);
		console.log('humidities ',humidities);

		return (
			<tr key={name}>
				<td><GoogleMap lon={lon} lat={lat} /></td>
				<td>
					<Chart data={temps} color="orange" units="K" />
				</td>
				<td>
					<Chart data={pressures} color="green" units="hPa" />
				</td>
				<td>
					<Chart data={humidities} color="blue" units="%" />
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
						<th>Temperature (K)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
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
