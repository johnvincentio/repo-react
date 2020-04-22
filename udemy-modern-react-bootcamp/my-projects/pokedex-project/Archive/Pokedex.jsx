//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import Pokecard from './Pokecard';

import { dataType } from '../types';

class Pokedex extends React.Component {

	render() {
		const { player, hand, total, winner, dealCards } = this.props;
		console.log('Pokedex::render(); dealCards ', dealCards, ' player ', player);
		return (
			<div className="pokedex">

				<div className="pokedex--cards">
					{hand.map((item, index) => (
						<Pokecard
							key={item.id}
							player={player}
							index={index}
							card={item}
							winner={winner}
							dealCards={dealCards}
						/>
					))}
				</div>
			</div>
		);
	}
}

Pokedex.propTypes = {
	player: PropTypes.string.isRequired,
	hand: dataType.isRequired,
	total: PropTypes.number.isRequired,
	winner: PropTypes.bool.isRequired,
	dealCards: PropTypes.bool.isRequired
};

export default Pokedex;
