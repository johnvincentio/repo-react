
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart';

import * as actions from '../actions/index';

class GoogleMap extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> GoogleMap; constructor');
		console.log(props);
		console.log(actions);
		console.log('<<< GoogleMap; constructor');
	}

	componentDidMount() {
		new google.maps.Map(this.refs.map, {
			zoom: 12,
			center: {
				lat: this.props.lat,
				lng: this.props.lon,
			}
		});
	}
	render() {
		// this.refs.map
		return (
			<div ref="map">Google Maps</div>
		);
	}
}

const mapStateToProps = state => ({
	weather: state.weather,
});

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch),
// });

export default connect(mapStateToProps)(GoogleMap);
