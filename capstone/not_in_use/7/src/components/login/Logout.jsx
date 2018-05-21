//

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/';

class Logout extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	console.log('--- Logout::constructor ', props);
	// }
	componentWillMount() {
		// console.log('Logout::componentWillMount; props ', this.props);
		this.props.actions.signoutUser();
		this.props.history.push('/');
	}

	render() {
		// console.log('Logout::render; props ', this.props);
		// const { datatype } = this.props;
		// console.log('datatype ', datatype);
		return '';
	}
}

Logout.propTypes = {
	actions: PropTypes.shape({
		signoutUser: PropTypes.func.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(Logout);
