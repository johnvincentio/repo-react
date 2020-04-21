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
					<Pokecard card = {hand[0]} winner={winner} />
					<Pokecard card = {hand[1]} winner={winner} />
					<Pokecard card = {hand[2]} winner={winner} />
					<Pokecard card = {hand[3]} winner={winner} />
				</div>
			</div>
		);
	}
}

Pokedex.propTypes = {
	hand: dataType.isRequired, // eslint-disable-line react/no-typos
	total: PropTypes.number.isRequired,
	winner: PropTypes.bool.isRequired
};

export default Pokedex;
