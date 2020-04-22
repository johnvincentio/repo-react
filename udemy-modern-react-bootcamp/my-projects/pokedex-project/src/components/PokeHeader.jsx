//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

class PokeHeader extends React.Component {

	render() {
		const { player, total, winner } = this.props;
		// console.log('PokeHeader::render();  player ', player);
		return (
			<div className={classnames(`pokeheader`, player === 1 ? `player1` : `player2`)}>
				<div className={`pokeheader--result ${winner ? "winner" : "loser"}`}>
					{winner ? "Winning Hand" : "Losing Hand"}
				</div>
				<div className="pokeheader--total">Total Experience: {total} </div>
			</div>
		);
	}
}

PokeHeader.propTypes = {
	player: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	winner: PropTypes.bool.isRequired
};

export default PokeHeader;

/*
<div className={`pokeheader ${player === 1 ? "player1" : "player2"}`}>
*/
