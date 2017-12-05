
import React from 'react';

import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<div><BookList /></div>
				<div><BookDetail /></div>
			</div>
		);
	}
}
