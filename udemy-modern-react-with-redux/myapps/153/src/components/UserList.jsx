
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../redux/actions';

import { usersType } from '../types';

class UserList extends React.Component {

	componentDidMount() {
		console.log('>>> PostList; componentDidMount; this.props ', this.props);
		this.props.actions.fetchUsers();
		console.log('<<< PostList; componentDidMount');
	}

	renderList() {
		return this.props.users.map(user => (
			<div key={user.id} className="item">
				<i className="user icon" />
				<div className="content">
					<div className="header">ID: {user.id}</div>
					<div className="description">Name: {user.name}</div>
				</div>
			</div>
		));
	}

	render() {
		console.log('UserList::render(); this.props ', this.props);
		console.log('renderList() ', this.renderList());
		return (
			<div className="ui container">
				<div className="ui divided list">
					{this.renderList()}
				</div>
			</div>
		);
	}
}

UserList.defaultProps = {
	users: []
}

UserList.propTypes = {
	users: usersType,
	actions: PropTypes.shape({
		fetchUsers: PropTypes.func.isRequired,
	}).isRequired,
};

// const mapStateToProps = state => ({
// 	posts: state.postsReducer.posts,
// });

const mapStateToProps = state => {
	console.log('Userlist::state ', state);
	return {
		users: state.usersReducer.users
	}
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

/*
<i class="user icon"></i>
	*/

