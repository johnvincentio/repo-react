//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import { dataItemType } from '../types';

import { createImageUrl } from '../utilities/utils';

class Pokecard extends React.Component {

	render() {
		const { player, index, card, winner, dealCards } = this.props;
		// console.log('Pokecard::render(); index ', index, ' dealCards ', dealCards);
		const { id, name, type, baseExperience } = card;
		const imageUrl = createImageUrl(id);
		const clz = `pokecard ${winner ? "winner" : "loser"} C${player}${index} ${dealCards ? "deal" : "deck"}`
		return (
			<div className={clz}>
				<div className="pokecard--image">
					<img src={imageUrl} alt={name} />
				</div>
				<div className="pokecard--name">{name}</div>
				<div className="pokecard--type">Type: {type}</div>
				<div className="pokecard--exp">EXP: {baseExperience}</div>
			</div>
		);
	}
}

Pokecard.propTypes = {
	player: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	card: dataItemType.isRequired,
	winner: PropTypes.bool.isRequired,
	dealCards: PropTypes.bool.isRequired
};

export default Pokecard;
