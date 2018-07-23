import React from 'react';
// import PropTypes from 'prop-types';

import Contact from './Contact';

import './address-book.css';

export default class AddressBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: [
				{
					name: 'Alice Aardvark',
					photo: 'https://api.adorable.io/avatars/64/alice%40thinkful.com',
					address: '1600 Pennsylvania Ave'
				},
				{
					name: 'Bob Bear',
					photo: 'https://api.adorable.io/avatars/64/bob%40thinkful.com',
					address: '725 5th Ave'
				},
				{
					name: 'Carol Coyote',
					photo: 'https://api.adorable.io/avatars/64/carol%40thinkful.com',
					address: '4 Pennsylvania Plaza'
				}
			]
		};
	}
	render() {
		const lists = this.state.contacts.map((item, index) => (
			<Contact key={index} index={index} {...item} />
		));
		return <div className="container">{lists}</div>;
	}
}

// AddressBook.propTypes = {
// 	contacts: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			name: PropTypes.string.isRequired,
// 			photo: PropTypes.string.isRequired,
// 			address: PropTypes.string.isRequired
// 		})
// 	).isRequired
// };
