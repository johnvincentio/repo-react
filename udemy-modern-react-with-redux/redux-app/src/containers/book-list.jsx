
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BookList extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> BookList; constructor');
		console.log(props);
		console.log('<<< BookList; constructor');
	}

	renderList() {
		return this.props.books((book) => {
			return (
				<li key={book.title} classMame="list-group-item">{book.title}</li>
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

export default BookList;
