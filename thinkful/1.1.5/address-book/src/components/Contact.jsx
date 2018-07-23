import React from 'react';
import PropTypes from 'prop-types';

import './contact.css';

const Contact = ({ index, name, photo, address }) => (
	<section id={`contact-${index}`} className="contact">
		<img className="contact-photo" src={photo} alt={photo} />
		<h2 className="contact-name">{name}</h2>
		<address className="contact-address">{address}</address>
	</section>
);

Contact.propTypes = {
	index: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	photo: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired
};

export default Contact;
