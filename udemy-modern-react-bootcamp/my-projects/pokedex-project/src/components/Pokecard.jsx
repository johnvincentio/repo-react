//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

import { dataItemType } from '../types';

import { createImageUrl } from '../utilities/utils';

class Pokecard extends React.Component {

	render() {
		const { card, winner } = this.props;
		const { id, name, type, baseExperience } = card;
		const imageUrl = createImageUrl(id);
		return (
			<div className={`pokecard ${ winner ? "winner" : "loser"}`}>
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
	card: dataItemType.isRequired, // eslint-disable-line react/no-typos
	winner: PropTypes.bool.isRequired
};

export default Pokecard;
