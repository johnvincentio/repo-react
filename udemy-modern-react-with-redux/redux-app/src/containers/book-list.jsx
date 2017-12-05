
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

class BookList extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> BookList; constructor');
		console.log(props);
		console.log(actions);
		console.log('<<< BookList; constructor');
		// this.handleSelectBook = this.handleSelectBook.bind(this);
	}

	handleSelectBook(book) {
		console.log('handleSelectBook: book is '+book.title);
		this.props.actions.selectBook(book);
	}

	renderList() {
		return this.props.books.map((book) => {
			return (
				<li
					key={book.title}
					onClick={() => this.handleSelectBook(book)}
					className="list-group-item">
					{book.title}
				</li>
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

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

/*
onClick={() => this.props.selectBook(book)}
*/
