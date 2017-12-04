
import React from 'react';

import { connect } from 'react-redux';

class BookList extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> BookList; constructor');
		console.log(props);
		console.log('<<< BookList; constructor');
	}

	renderList() {
		return this.props.books.map((book) => {
			return (
				<li key={book.title} className="list-group-item">{book.title}</li>
			);
		});
	}
	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	books: state.books,
});

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch),
// });

export default connect(mapStateToProps)(BookList);
