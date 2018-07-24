//

import React from 'react';
import PropTypes from 'prop-types';

export default function Navigation(props) {
	console.log('Game');
	return (
		<header>
			<nav>
				<ul className="clearfix">
					<li>
						<button onClick={props.toggleHelp}>What!</button>
					</li>
					<li>
						<a className="what" href="#">
							What ?
						</a>
					</li>
					<li>
						<a className="new" href="#">
							+ New Game
						</a>
					</li>
				</ul>
			</nav>
			<h1>HOT or COLD</h1>
		</header>
	);
}

Navigation.propTypes = {
	toggleHelp: PropTypes.func.isRequired
};
