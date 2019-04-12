import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../redux/actions';

import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> App; constructor');
		console.log(props);
		console.log('<<< App; constructor');
	}

	render() {
		return <div className="ui container">hello</div>;
	}
}

App.propTypes = {
	actions: PropTypes.shape({
		getUserData: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	data: state.dataReducer.data
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
