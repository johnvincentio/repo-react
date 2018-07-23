import React from 'react';
import PropTypes from 'prop-types';

import Contact from './Contact';

import './address-book.css';

export default class AddressBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: props.contacts
		};
	}
	render() {
		const lists = this.state.contacts.map((item, index) => (
			<li className="clearfix" key={index}>
				<Contact name={item.name} photo={item.photo} address={item.address} />
			</li>
		));
		return (
			<div className="container">
				<ul>{lists}</ul>
			</div>
		);
	}
}

AddressBook.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			photo: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired
		})
	).isRequired
};
