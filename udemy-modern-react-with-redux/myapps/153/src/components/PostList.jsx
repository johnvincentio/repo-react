
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../redux/actions';

import { postsType } from '../types';

class PostList extends React.Component {

	componentDidMount() {
		this.props.actions.fetchPosts();
	}

	renderList() {
		return this.props.posts.map(post => (
			<div key={post.id} className="item">
				<i className="user icon" />
				<div className="content">
					<div className="header">{post.title}</div>
					<div className="description">{post.body}</div>
				</div>
			</div>
		));
	}

	render() {
		return (
			<div className="ui container">
				<div className="ui divided list">
					{this.renderList()}
				</div>
			</div>
		);
	}
}

PostList.defaultProps = {
	posts: []
}

PostList.propTypes = {
	posts: postsType,
	actions: PropTypes.shape({
		fetchPosts: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	posts: state.postsReducer.posts,
});

// const mapStateToProps = state => {
// 	console.log('state ', state);
// 	return {
// 		posts: state.postsReducer.posts
// 	}
// };

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
