//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

class Coin extends React.Component {

	render() {
		console.log('Coin::render(); this.props ', this.props);
		const jpg = this.props.heads ? `images/heads.jpg` : `images/tails.jpg`;

		return (
			<div className="coin">
				<img src={jpg} alt={this.props.heads ? 'heads' : 'tails'} />
			</div>
		);
	}
}

Coin.propTypes = {
	heads: PropTypes.bool.isRequired
};

export default Coin;
