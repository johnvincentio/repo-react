
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../redux/actions';

import { postsType } from '../types';

import PostList from './PostList';

class App extends React.Component {

	componentDidMount() {
		console.log('>>> App; componentDidMount; this.props ', this.props);
		this.props.actions.fetchPosts();
		console.log('<<< App; componentDidMount');
	}

	render() {
		return (
			<div className="ui container">
				<div>App...</div>
				<div><PostList posts={this.props.posts} /></div>
			</div>
		);
	}
}

App.defaultProps = {
	posts: []
}
App.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
