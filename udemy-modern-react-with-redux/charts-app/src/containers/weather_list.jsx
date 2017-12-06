
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

class WeatherList extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> WeatherList; constructor');
		console.log(props);
		console.log(actions);
		console.log('<<< WeatherList; constructor');
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
