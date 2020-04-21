//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import { createImageUrl } from '../utilities/utils';

class Pokecard extends React.Component {

	render() {
		const { id, name, type, baseExperience } = this.props.card;
		const imageUrl = createImageUrl(id);

		return (
			<div className="pokecard">
				<div className="pokecard--name">{name}</div>
				<img src={imageUrl} alt={name} />
				<div className="pokecard--type">Type: {type}</div>
				<div className="pokecard--exp">EXP: {baseExperience}</div>
			</div>
		);
	}
}

export default Pokecard;
