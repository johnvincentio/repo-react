import React from 'react';
import PropTypes from 'prop-types';

import './navigation-bar.css';

const NavigationBar = props => {
	const { title, links } = props;

	const lists = links.map((item, index) => (
		<li key={index}>
			<a href="{item.href}">{item.text}</a>
		</li>
	));

	return (
		<div className="navigation-bar">
			<h1>{title}</h1>
			<nav>
				<ul className="navigation-bar-nav">{lists}</ul>
			</nav>
		</div>
	);
};

NavigationBar.propTypes = {
	title: PropTypes.string.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string.isRequired,
			href: PropTypes.string.isRequired
		})
	).isRequired
};

export default NavigationBar;
