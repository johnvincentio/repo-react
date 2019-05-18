//

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';

import * as actions from '../redux/actions';

import Outer from '../containers/Outer';
import Inner from '../containers/Inner';

class Folders extends React.Component {
	componentDidMount() {
		console.log('--- Folders::componentDidMount');
		this.props.actions.getMusicData();
	}

	render() {
		console.log('Folders::render()');
		return (
			<Outer>
				<Inner>
					<Button variant="contained" color="primary">
						Hello World
					</Button>
				</Inner>
			</Outer>
		);
	}
}

Folders.propTypes = {
	// widgets: widgetsType.isRequired,
	actions: PropTypes.shape({
		getMusicData: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps(state) {
	console.log('Folders::mapStateToProps(), state ', state);
	return {
		// widgets: Object.values(state.data),
		// userId: state.auth.userId,
		// signedIn: state.auth.signedIn
	};
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Folders);
