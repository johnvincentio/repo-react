
import React from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMapContainer from '../components/GoogleMapContainer';


class WeatherList extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> WeatherList; constructor');
		console.log(props);
		console.log('<<< WeatherList; constructor');
	}
	renderWeather(cityData) {
		const name = cityData.city.name;
		const temps = cityData.list.map(weather => weather.main.temp);
		const pressures = cityData.list.map(weather => weather.main.pressure);
		const humidities = cityData.list.map(weather => weather.main.humidity);
		const { lon, lat } = cityData.city.coord;
		const zoom = 11;

		console.log('temps ',temps);
		console.log('pressures ',pressures);
		console.log('humidities ',humidities);

		return (
			<tr key={name}>
				<td><GoogleMapContainer lon={lon} lat={lat} zoom={zoom} /></td>
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

export default connect(mapStateToProps)(WeatherList);
