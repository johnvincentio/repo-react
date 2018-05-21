import React from 'react';
import PropTypes from 'prop-types';

class DesktopMain extends React.Component {
	constructor(props) {
		// eslint-disable-line no-useless-constructor
		super(props);
		console.log('--- DesktopMain::constructor ', props);
	}

	render() {
		return (
			<div>
				<h2>{this.props.text}</h2>
			</div>
		);
	}
}

DesktopMain.propTypes = {
	text: PropTypes.string.isRequired
};

export default DesktopMain;
