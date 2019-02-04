
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../redux/actions';

class StreamList extends React.Component {
	componentDidMount() {
		console.log('StreamList::componentDidMount')
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
	        </Link>
					<Link
						to={`/streams/delete/${stream.id}`}
						className="ui button negative"
					>
						Delete
	        </Link>
				</div>
			);
		}
		return null;
	}

	renderList() {
		console.log('StreamList::renderList, props ', this.props);
		return this.props.streams.map(stream => (
			<div className="item" key={stream.id}>
				{this.renderAdmin(stream)}
				<i className="large middle aligned icon camera" />
				<div className="content">
					<Link to={`/streams/${stream.id}`} className="header">
						{stream.title}
					</Link>
					<div className="description">{stream.description}</div>
				</div>
			</div>
		));
	}

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
	        </Link>
				</div>
			);
		}
		return null;
	}

	render() {
		console.log('StreamList::render, props ', this.props);
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

StreamList.propTypes = {
	fetchStreams: PropTypes.func.isRequired,
	isSignedIn: PropTypes.bool.isRequired,
	currentUserId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	console.log('mapStateToProps, state ', state);
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(
	mapStateToProps,
	{ fetchStreams }
)(StreamList);
