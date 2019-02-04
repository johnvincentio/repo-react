
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { fetchStream } from '../../redux/actions';

class StreamEdit extends React.Component {
	componentDidMount() {
		console.log('StreamEdit::componentDidMount')
		this.props.fetchStream(this.props.match.params.id);
	}

	render() {
		console.log('StreamEdit, props ', this.props)
		if (!this.props.stream) {
			return <div>Loading...</div>
		}
		return <div>{this.props.stream.title}</div>;
	}
}

StreamEdit.propTypes = {
	fetchStream: PropTypes.func.isRequired,
	// isSignedIn: PropTypes.bool.isRequired,
	// currentUserId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
	console.log('mapStateToProps, state ', state, ' ownProps ', ownProps);
	return {
		stream: state.streams[ownProps.match.params.id]
		// currentUserId: state.auth.userId,
		// isSignedIn: state.auth.isSignedIn
	};
};

export default connect(
	mapStateToProps,
	{ fetchStream }
)(StreamEdit);


