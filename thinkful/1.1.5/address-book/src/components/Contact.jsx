import React from 'react';
import PropTypes from 'prop-types';

import './contact.css';

const Contact = ({ name, photo, address }) => (
	<div>
		<img src={photo} alt={photo} />
		<div className="name">{name}</div>
		<div className="address">{address}</div>
	</div>
);

Contact.propTypes = {
	name: PropTypes.string.isRequired,
	photo: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired
};

export default Contact;
