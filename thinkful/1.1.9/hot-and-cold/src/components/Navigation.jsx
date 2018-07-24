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

// Game.propTypes = {
// 	characters: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			name: PropTypes.string.isRequired,
// 			description: PropTypes.string.isRequired,
// 			actor: PropTypes.string.isRequired
// 		})
// 	).isRequired
// };
