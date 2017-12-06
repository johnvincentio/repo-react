
import React from 'react';
import GoogleMapReact from 'google-map-react';

class GoogleMapContainer extends React.Component {
	render() {
		const lat = this.props.lat;
		const lng = this.props.lon;
		// console.log('lat ', lat, ' lon ', lng);
		// console.log('GoogleMapContainer ',this.props);
    return (
      <div className='google-map'>
        <GoogleMapReact
          defaultCenter={{ lat, lng }}
          defaultZoom={ this.props.zoom }>
        </GoogleMapReact>
      </div>
    )
  }
}

GoogleMapContainer.defaultProps = {
	center: { lat: 40.7446790, lng: -73.9485420 },
	zoom: 11,
};

export default GoogleMapContainer;

/*
const AnyReactComponent = ({ text }) => <div>{ text }</div>;

<div className='google-map'>
	<GoogleMapReact
		defaultCenter={{ lat, lng }}
		defaultZoom={ this.props.zoom }>
		<AnyReactComponent
			lat={ lat }
			lng={ lng }
			text={ '' }
		/>
	</GoogleMapReact>
</div>
*/
