
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

class BookDetail extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> BookDetail; constructor');
		console.log(props);
		console.log(actions);
		console.log('<<< BookDetail; constructor');
	}

	render() {
		if (!this.props.book) {
			return <div>Select a book to get started</div>
		}
		return (
			<div>
				<h3>Details for:</h3>
				<div>Title: {this.props.book.title}</div>
				<div>Pages: {this.props.book.pages}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	book: state.activeBook,
});

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch),
// });

export default connect(mapStateToProps)(BookDetail);
