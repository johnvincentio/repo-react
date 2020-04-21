//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import Pokecard from './Pokecard';

import { dataType } from '../types';

class Pokedex extends React.Component {

	render() {
		const { hand, total, winner } = this.props;
		return (
			<div className="pokedex">
				<div className={`pokedex--result ${ winner ? "winner" : "loser"}`}>
					{winner ? "Winning Hand" : "Losing Hand"}
				</div>
				<div className="pokedex--total">Total Experience: {total} </div>
				<div className="pokedex--cards">
					{hand.map(item => (
						<Pokecard key={item.id} card = {item} winner={winner} />
					))}
				</div>
			</div>
		);
	}
}

Pokedex.propTypes = {
	hand: dataType.isRequired,
	total: PropTypes.number.isRequired,
	winner: PropTypes.bool.isRequired
};

export default Pokedex;
